
Ext.define('Scrum.view.project.ProjectModel', {

	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.project',
	requires: [
		'Scrum.data.schema.BaseSchema',
		'Scrum.model.resource.Personnel',
		'Scrum.model.resource.ProjectTask'
	],

	/**
	 * @link {Scrum.model.resource.Project} project
	 */

	schema: 'base',

	data: {
		projectId: null
	}

});