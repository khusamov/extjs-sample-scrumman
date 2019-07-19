
Ext.define('Scrum.view.project.taskList.ProjectTaskListModel', {

	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.projecttasklist',
	requires: ['Scrum.model.resource.ProjectTask'],

	data: {
		projectTaskStoreFilters: null
	},

	stores: {
		projectTaskStore: {
			model: 'resource.ProjectTask',
			remoteFilter: true,
			filters: '{projectTaskStoreFilters}'
		}
	}

});