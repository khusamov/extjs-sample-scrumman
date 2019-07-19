
/**
 * Контроллер для создания счетчиков на вкладках.
 * Считается что есть вкладки, внутри которых есть хранилище, чье значение total нужно отображать
 * на кнопке вкладки рядом с заголовком вкладки.
 * По умолчанию хранилище ищется в модели вида.
 * Если оно не найдено и вид потомок Ext.grid.Panel, то хранилище берется методом getStore().
 * Есть возможность привязываться через имена классов, так и через селекторы.
 *
 * Вывод значения счетчика производится посредством связывания с переменной счетчика, которая автоматически
 * располагается в модели главного вида приложения.
 *
 * Соответственно на местах следует прописывать связывание, например как это сделано в классе
 * Scrum.view.main.tabPanel.MainTabPanelController в методе addTabView():
 * bind: {
 *     title: 'Название вкладки ({<Имя счетчика>})'
 * }
 *
 * Для вычисления имен счетчиков можно пользоваться функцией Scrum.controller.TabCounters.getCounterName(className),
 * на вход которой следует подавать имя класса вкладки (которое было прописано
 * в Scrum.controller.TabCounters.privates.counters).
 */
Ext.define('Scrum.controller.TabCounters', {

	extend: 'Ext.app.Controller',
	uses: [
		'Ext.data.Store',
		'Ext.grid.Panel'
	],

	statics: {

		counterNamePrefix: 'TabCounters.',

		/**
		 * Конвертация имени класса вида в имя счетчика.
		 * Пример кода как получать доступ к этой функции на местах (чтобы не выдумывать
		 * имена счетчиков, а вычислять по единому правилу):
		 *
		 * const tabCountersController = Scrum.getApplication().getController('TabCounters', true);
		 * if (tabCountersController) {
		 *     const TabCountersClass = Ext.ClassManager.getClass(tabCountersController);
		 *     const counterName = TabCountersClass.getCounterName(<Имя класса вида>);
		 *
		 */
		getCounterName(className) {
			let name;
			const parts = className.split('.').slice(2);
			if (parts.length === 2) {
				if (parts[0].toLowerCase() === parts[1].toLowerCase()) {
					name = parts[0];
				} else {
					name = parts.join('');
				}
			} else {
				name = parts.join('');
			}
			return this.counterNamePrefix + name;
		}

	},

	listen: {
		component: {
			'*': {
				add: 'onComponentAdd'
				// TODO Добавить обработку события remove или beforeremove
			}
		}
	},

	/**
	 * Таблица с настройками счетчиков.
	 * Привязка идет как через имена классов (view), так и через селекторы (selector).
	 */
	counters: [{
		view: 'Scrum.view.roleList.RoleList',
		storeName: 'roleStore'
	}, {
		selector: 'maincardpanel > personnellist',
		storeName: 'personnelStore'
	}, {
		selector: 'maincardpanel > project > tabpanel > personnellist',
		storeName: 'personnelStore',
		counterName(personnelList) {
			const prefix = Scrum.controller.TabCounters.counterNamePrefix;
			const projectId = personnelList.up('project').getProjectId();
			return prefix + `project${projectId}.personnelList`;
		}
	}, {
		selector: 'maincardpanel > project > tabpanel > projecttasklist',
		storeName: 'projectTaskStore',
		counterName(projectTaskList) {
			const prefix = Scrum.controller.TabCounters.counterNamePrefix;
			const projectId = projectTaskList.up('project').getProjectId();
			return prefix + `project${projectId}.projectTaskList`;
		}
	}, {
		view: 'Scrum.view.projectList.ProjectList',
		storeName: 'projectStore'
	}, {
		view: 'Scrum.view.teamList.TeamList',
		storeName: 'teamStore'
	}],

	privates: {

		onComponentAdd(container, component) {
			// Делаем отлов события render, потому что по событию add компонент
			// не доступен про запросах Ext.ComponentQuery.query().
			component.on('render', 'onComponentRenderSingle', this, {single: true});
		},

		onComponentRenderSingle(component) {
			const counterInfo = this.findCounterInfo(component);
			if (counterInfo) {
				const componentViewModel = component.getViewModel();
				const counterStore = componentViewModel ? componentViewModel.getStore(counterInfo.storeName) : null;
				if (counterStore) {
					this.createStoreListeners(counterStore, counterInfo, component);
				} else {
					if (component instanceof Ext.grid.Panel) {
						const counterStore = component.getStore();
						if (counterStore) this.createStoreListeners(counterStore, counterInfo, component);
						component.on('reconfigure', (grid, counterStore) => {
							this.createStoreListeners(counterStore, counterInfo, component);
						}, this);
					} else {
						console.warn([
							`TabCounters: ${counterInfo.view} не содержит ${counterInfo.storeName}`,
							`и не является потомком "Ext.grid.Panel". Счетчик не будет работать.`
						].join(' '));
					}
				}
			}
		},

		findCounterInfo(component) {
			// Сначала ищем сопоставления имени класса компонента и параметра view из таблицы this.counters.
			let counterInfo = (
				this.counters
					.filter(counterInfo => !('selector' in counterInfo))
					.find(counterInfo => counterInfo.view === component.self.getName())
			);
			// Если не нашли, то далее ищем соответствия компонента селектору selector из таблицы this.counters.
			if (!counterInfo) {
				counterInfo = (
					this.counters
						.filter(counterInfo => 'selector' in counterInfo)
						.find(counterInfo => Ext.Array.contains(Ext.ComponentQuery.query(counterInfo.selector), component))
				);
				// Если селектор найден, то к информации о счетчике добавляем имя класса компонента.
				if (counterInfo) counterInfo.view = component.self.getName();
			}
			return counterInfo;
		},

		createStoreListeners(counterStore, counterInfo, component) {
			const counterName = this.getCounterName(counterInfo, component);

			const publishCounterValue = () => {
				this.publishCounterValue(counterName, counterStore.getTotalCount());
			};

			const counterSeparateStore = Ext.create('Ext.data.Store', {
				model: counterStore.getModel()
			});
			const publishCounterValueSeparateRequest = () => {
				counterSeparateStore.load({
					callback: () => {
						this.publishCounterValue(counterName, counterSeparateStore.getTotalCount());
					}
				});
			};

			// Для событий add и remove возникают проблемы из-за того, что getTotalCount() возвращает
			// старое значение. Методы getRemovedRecords(), getModifiedRecords() и getUpdatedRecords()
			// не помогают, потому что запросы на создание/удаление идут отдельно друг от друга,
			// а результаты подсчета не накапливаются и в итоге формула расчета total на основе значений
			// этих методов не работает.
			// При добавлении запись не фантомная (потому перед добавлением она была отправлена на сервер)
			// и в getModifiedRecords не попадает - в итоге самый надежный способ обновления это отправка
			// запроса на сервер отдельно от хранилища, то есть специально для счетчика
			// (см. publishCounterValueSeparateRequest()).
			// Функция publishCounterValueSeparateRequest помогает не во всех случаях. И при MULTI-удалении
			// снова возникают ошибки подсчета total.
			// TODO В этом способе исправления ошибки в предыдущем TODO проблема при MULTI-удалении
			// Тут на много запросов удалении генерится одно событие remove причем после первого удаления.

			publishCounterValue();
			counterStore.on({
				add: publishCounterValueSeparateRequest,
				remove: publishCounterValueSeparateRequest,
				load: publishCounterValue
			});
		},

		getCounterName(counterInfo, component) {
			return 'counterName' in counterInfo ? (
				Ext.isFunction(counterInfo.counterName) ?
					counterInfo.counterName(component) :
					counterInfo.counterName
			) : (
				this.self.getCounterName(counterInfo.view)
			);
		},

		publishCounterValue(counterName, value) {
			this.getApplication().getMainView().getViewModel().set(counterName, value);
		}

	}

});