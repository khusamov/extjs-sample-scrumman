
Ext.define('Scrum.view.personnelList.PersonnelListController', {

	extend: 'Ext.app.ViewController',
	alias: 'controller.personnellist',
	requires: ['Ext.Object'],

	waitForViewAfterRender() {
		return Ext.create('Ext.Promise', resolve => {
			if (this.getView().rendered) resolve(); else this.getView().on('afterrender', resolve);
		});
	},

	onFiltersChange(filters) {
		const view = this.getView();
		this.getViewModel().set('personnelStoreFilters', filters);

		// Скрыть в колонки таблицы с мастер-полями.
		filters.forEach(filter => {
			const column = view.getColumns().find(column => column.dataIndex === filter.property);
			if (column) column.hide();
		});

		this.waitForViewAfterRender().then(() => {
			const gridEditionToolbar = view.down('grideditiontoolbar');

			function setRecordFormWindowConfig(config) {
				const ge = gridEditionToolbar;
				// Нормализация recordFormWindow.
				ge.setRecordFormWindow(
					Ext.isString(ge.getRecordFormWindow()) ? {
						xtype: ge.getRecordFormWindow()
					} : ge.getRecordFormWindow()
				);
				// Обновление опции.
				ge.setRecordFormWindow(Ext.Object.merge(ge.getRecordFormWindow(), config));
			}

			// Скрыть мастер-поля в диалоговом окне CRUD.
			setRecordFormWindowConfig({
				fields: filters.map(filter => ({
					name: filter.property,
					hidden: true,
					value: filter.value
				}))
			});

			// Если не определен хотя бы один фильтр, то блокируем кнопку Новая запись.
			gridEditionToolbar.setDisabled(
				filters.reduce((result, filter) => result || !filter.value, false)
			);
		});
	},

	onRoleStoreLoad(roleStore) {
		roleStore.$loaded = true;
		this.getView().getStore().load();
	},

	onTeamStoreLoad(teamStore) {
		teamStore.$loaded = true;
		this.getView().getStore().load();
	},

	roleIdRenderer(value) {
		return this.referencedRecordRenderer('roleStore', 'name', value);
	},

	roleGroupRenderer(value, metaData, record) {
		return this.referencedRecordRenderer('roleStore', 'group', record.get('roleId'));
	},

	teamIdRenderer(value) {
		return this.referencedRecordRenderer('teamStore', 'name', value);
	},

	referencedRecordRenderer(storeName, displayFieldName, value) {
		const store = this.getStore(storeName);
		if (store.$loaded) {
			const referencedRecord = store.findRecord('id', value);
			return referencedRecord ? referencedRecord.get(displayFieldName) : `<Не найдена запись с id = ${value}>`;
		} else {
			return 'Данные загружаются...';
		}
	}

});