
Ext.define('Scrum.view.projectList.ProjectListModel', {

	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.projectlist',
	requires: [
		'Scrum.data.schema.BaseSchema',
		'Scrum.model.resource.Team'
	],

	schema: 'base',

	stores: {
		projectStore: {
			model: 'resource.Project'
		},
		teamStore: {
			model: 'resource.Team',
			autoLoad: true,
			listeners: {
				load: 'onTeamStoreLoad'
			}
		}
	}

});