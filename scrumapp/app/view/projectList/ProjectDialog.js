
Ext.define('Scrum.view.projectList.ProjectDialog', {

	extend: 'Scrum.window.DialogWindow',
	xtype: 'projectdialog',
	requires: [
		'Ext.form.field.Date',
		'Ext.form.field.ComboBox',
		'Scrum.data.schema.BaseSchema',
		'Scrum.model.resource.Team'
	],

	title: {
		insert: 'Новый проект',
		update: 'Проект «{name}»'
	},

	updateRecord(project) {
		this.callParent(arguments);
		this.getViewModel().set('teamId', project.get('teamId'));
	},

	viewModel: {
		schema: 'base',
		data: {
			teamId: null
		},
		stores: {
			teamStore: {
				model: 'resource.Team',
				autoLoad: true,
				remoteFilter: true,
				filters: [{
					property: 'free',
					value: true
				}, {
					property: 'orTeamId',
					value: '{teamId}'
				}]
			}
		}
	},

	items: [{
		fieldLabel: 'Название',
		allowBlank: false,
		name: 'name'
	}, {
		fieldLabel: 'Дата начала',
		name: 'started',
		xtype: 'datefield'
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