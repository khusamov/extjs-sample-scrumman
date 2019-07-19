
Ext.define('Scrum.view.project.taskList.ProjectTaskList', {

	extend: 'Ext.grid.Panel',
	xtype: 'projecttasklist',
	viewModel: 'projecttasklist',
	controller: 'projecttasklist',
	requires: [
		'Ext.toolbar.Paging',
		'Eirc.toolbar.GridEdition',
		'Scrum.view.project.taskList.ProjectTaskListModel',
		'Scrum.view.project.taskList.ProjectTaskListController',
		'Scrum.view.project.taskList.ProjectTaskDialog'
	],

	config: {
		filters: []
	},

	updateFilters(filters) {
		this.getController().onFiltersChange(filters);
	},

	bind: {
		store: '{projectTaskStore}'
	},

	columns: [{
		text: 'Название задачи',
		dataIndex: 'name',
		flex: 1
	}, {
		text: 'Длительность, часы',
		dataIndex: 'duration',
		flex: 1
	}],

	tbar: {
		xtype: 'grideditiontoolbar',
		recordFormWindow: 'projecttaskdialog',
		listeners: {
			insert: 'onGridEditionToolbarInsert'
		}
	},

	bbar: {
		xtype: 'pagingtoolbar',
		displayInfo: true
	}

});