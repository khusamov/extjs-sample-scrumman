
Ext.define('Scrum.view.projectList.ProjectList', {

	extend: 'Ext.grid.Panel',
	xtype: 'projectlist',
	viewModel: 'projectlist',
	controller: 'projectlist',
	requires: [
		'Ext.toolbar.Paging',
		'Ext.grid.column.Date',
		'Eirc.toolbar.GridEdition',
		'Scrum.view.projectList.ProjectListModel',
		'Scrum.view.projectList.ProjectListController',
		'Scrum.view.projectList.ProjectDialog'
	],

	listeners: {
		itemdblclick: 'onItemDblClick'
	},

	bind: {
		store: '{projectStore}',
		selection: '{selection}'
	},

	columns: [{
		text: 'Название проекта',
		dataIndex: 'name',
		flex: 1
	}, {
		text: 'Дата начала проекта',
		xtype: 'datecolumn',
		dataIndex: 'started',
		flex: 1
	}, {
		text: 'Команда',
		dataIndex: 'teamId',
		flex: 1,
		renderer: 'teamIdRenderer'
	}, {
		text: 'Количество сотрудников',
		dataIndex: 'personnelCount',
		flex: 1,
		renderer: value => value || ''
	}, {
		text: 'Мощность команды, часы/спринт',
		dataIndex: 'power',
		flex: 1,
		renderer: value => value || ''
	}],

	tbar: {
		xtype: 'grideditiontoolbar',
		recordFormWindow: 'projectdialog',
		listeners: {
			submit: 'onGridEditionToolbarSubmit'
		},
		items: [{
			text: 'Открыть',
			handler: 'onOpenButtonClick',
			disabled: true,
			bind: {
				text: 'Открыть {selection ? "«" + selection.name + "»" : ""}',
				disabled: '{!selection}'
			}
		}]
	},

	bbar: {
		xtype: 'pagingtoolbar',
		displayInfo: true
	}

});