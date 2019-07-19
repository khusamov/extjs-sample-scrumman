
Ext.define('Scrum.view.personnelList.PersonnelDialog', {

	extend: 'Scrum.window.DialogWindow',
	xtype: 'personneldialog',
	requires: [
		'Scrum.data.schema.BaseSchema',
		'Scrum.model.resource.Role',
		'Scrum.model.resource.Team'
	],

	title: {
		insert: 'Новый сотрудник',
		update: 'Сотрудник «{name}»'
	},

	viewModel: {
		schema: 'base',
		stores: {
			roleStore: {
				model: 'resource.Role'
			},
			teamStore: {
				model: 'resource.Team'
			}
		}
	},

	items: [{
		fieldLabel: 'Имя',
		allowBlank: false,
		name: 'name'
	}, {
		fieldLabel: 'Электропочта',
		name: 'email'
	}, {
		fieldLabel: 'Роль',
		name: 'roleId',
		xtype: 'combobox',
		queryMode: 'remote',
		displayField: 'name',
		valueField: 'id',
		editable: false,
		autoLoadOnValue: true,
		bind: {
			store: '{roleStore}'
		}
	}, {
		fieldLabel: 'Команда',
		name: 'teamId',
		xtype: 'combobox',
		queryMode: 'remote',
		displayField: 'name',
		valueField: 'id',
		editable: false,
		autoLoadOnValue: true,
		bind: {
			store: '{teamStore}'
		}
	}]

});