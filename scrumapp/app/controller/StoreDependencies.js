
/**
 * Специальный механизм обновления зависимых хранилищ.
 * Данная версия позволяет связывать хранилища через имена классов видов, где эти хранилища находятся.
 * Есть возможность связывать через разные события хранилища (load, write и пр.).
 * Обновляться будут хранилища всех экземпляров классов ведомых компонент.
 * Если есть несколько видов класса А, которые являются мастер компонентами. И в одном из них
 * произошли изменения, то в будет обновлены хранилища с таким же именем в других видах этого класса.
 *
 * Ограничения:
 * Считаем, что у компонента, от которого кто-то зависит, все хранилища сразу доступны.
 * У ведомых хранилищ будет вызываться метод load(). Изменить метод нельзя.
 * Нет возможности разграничить экземпляры классов ведомых компонент. Например, есть несколько видов класса А,
 * которые зависят от вида класса Б. При обновлении любого из экземпляров вида класса Б будут обновлены все
 * экземпляры видов класса А.
 */
Ext.define('Scrum.controller.StoreDependencies', {

	extend: 'Ext.app.Controller',

	/**
	 * Подписываемся на события add всех компонент приложения,
	 * в том числе тех, которые будут созданы позже.
	 */
	listen: {
		component: {
			'*': {
				add: 'onComponentAdd'
				// TODO Добавить обработку события remove или beforeremove
			}
		}
	},

	/**
	 * Таблица зависимостей хранилищ.
	 * Формат таблицы:
	 * <Имя класса мастер компонента>.<Имя хранилища>.<Событие>.<Имя ведомого компонента>: [<Массив ведомых хранилищ>]
	 * Здесь <Событие> можно записывать в формате <Событие1|Событие2|...>, если необходимо повесить один обработчик на несколько событий.
	 * Ограничения:
	 * У ведомых хранилищ будет вызываться метод load(). Изменить метод нельзя.
	 */
	storeDependencies: {
		'Scrum.view.roleList.RoleList': {
			roleStore: {
				'write|remove': {
					'Scrum.view.roleList.PersonnelList': ['personnelStore', 'roleStore']
				}
			}
		}
	},

	/**
	 * @property {String[]}
	 */
	componentNames: [],

	/**
	 * Массив компонент (мастер и ведомых), между которым установлены связи (из this.storeDependencies).
	 * Массив содержит все экземпляры каждого класса.
	 * @property {Object} components
	 * @property {Object} components.<className>
	 * @property {Ext.Component[]} components.<className>.[<Ext.Component>] Массив компонент класса <className>.
	 */
	components: {},

	init(app) {
		this.componentNames = this.extractComponentNames(this.storeDependencies);
	},

	extractComponentNames(storeDependencies) {
		const result = [];
		Ext.Object.each(storeDependencies, (masterComponentName, masterComponentStores) => {
			result.push(masterComponentName);
			Ext.Object.each(masterComponentStores, (masterStoreName, masterStoreEvents) => {
				Ext.Object.each(masterStoreEvents, (masterStoreEventName, slaveComponents) => {
					Ext.Object.each(slaveComponents, (slaveComponentName, slaveStoreNames) => {
						result.push(slaveComponentName);
					});
				});
			});
		});
		return result;
	},

	onComponentAdd(container, component) {
		const componentName = component.self.getName();
		if (Ext.Array.contains(this.componentNames, componentName)) {
			this.components[componentName] = this.components[componentName] || [];
			this.components[componentName].push(component);
		}

		const masterComponentStores = this.storeDependencies[componentName];
		if (masterComponentStores) {
			const masterComponent = component;
			const masterComponentName = componentName;
			Ext.Object.each(masterComponentStores, (masterStoreName, masterStoreEvents) => {
				// Считаем, что у masterComponent все хранилища сразу доступны.
				const masterStore = masterComponent.getViewModel().getStore(masterStoreName);
				Ext.Object.each(masterStoreEvents, (masterStoreEventName, slaveComponents) => {
					const handler = () => {
						// Если есть несколько видов класса А, которые являются мастер компонентами.
						// И в одном из них произошли изменения, то в будет обновлены хранилища
						// с таким же именем в других видах этого класса.
						this.components[componentName].filter(cmp => cmp !== masterComponent).forEach(cmp => {
							cmp.getViewModel().getStore(masterStoreName).load();
						});

						Ext.Object.each(slaveComponents, (slaveComponentName, slaveStoreNames) => {
							const slaveComponentInstances = this.components[slaveComponentName];
							if (slaveComponentInstances) {
								slaveComponentInstances.forEach(slaveComponent => {
									slaveStoreNames.forEach(slaveStoreName => {
										const slaveStore = slaveComponent.getViewModel().getStore(slaveStoreName);
										if (slaveStore) slaveStore.load();
									});
								});
							}
						});
					};

					masterStoreEventName.split('|').map(e => e.trim()).forEach(masterStoreEventName => {
						masterStore.on(masterStoreEventName, handler);
					});
				});
			});
		}
	}

});