
Ext.define('Scrum.view.project.taskList.ProjectTaskListController', {

	extend: 'Ext.app.ViewController',
	alias: 'controller.projecttasklist',
	requires: ['Ext.window.MessageBox'],

	onFiltersChange(filters) {
		this.getViewModel().set('projectTaskStoreFilters', filters);
	},

	onGridEditionToolbarInsert(record) {
		record.set('projectId', this.getView().lookupViewModel().get('project.id'));
	}

});