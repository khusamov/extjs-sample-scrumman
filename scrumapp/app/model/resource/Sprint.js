
Ext.define('Scrum.model.resource.Sprint', {

	extend: 'Scrum.model.Base',

	fields: [{
		name: 'projectId',
		type: 'integer'
	}, {
		name: 'number',
		type: 'integer'
	}, {
		name: 'started',
		type: 'date'
	}, {
		name: 'power',
		type: 'number'
	}]

});