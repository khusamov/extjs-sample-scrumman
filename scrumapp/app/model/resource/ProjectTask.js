
Ext.define('Scrum.model.resource.ProjectTask', {

	extend: 'Scrum.model.Base',
	requires: ['Scrum.model.resource.Project'],

	fields: [{
		name: 'name',
		type: 'string'
	}, {
		/**
		 * Длительность задачи, часы.
		 * @field {Number}
		 */
		name: 'duration',
		type: 'number'
	}, {
		name: 'projectId',
		type: 'integer',
		reference: 'resource.Project'
	}]

});