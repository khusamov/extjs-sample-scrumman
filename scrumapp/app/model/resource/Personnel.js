
Ext.define('Scrum.model.resource.Personnel', {

	extend: 'Scrum.model.Base',
	requires: [
		'Scrum.model.resource.Team',
		'Scrum.model.resource.Role'
	],

	fields: [{
		name: 'name',
		type: 'string',
		defaultValue: 'Новое имя'
	}, {
		name: 'email',
		type: 'string'
	}, {
		name: 'roleId',
		type: 'integer',
		reference: 'resource.Role'
	}, {
		name: 'teamId',
		type: 'integer',
		reference: 'resource.Team'
	}]

});