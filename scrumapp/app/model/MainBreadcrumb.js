
Ext.define('Scrum.model.MainBreadcrumb', {

	extend: 'Ext.data.TreeModel',
	requires: ['Scrum.data.schema.TreeSchema'],

	schema: 'tree',

	identifier: {
		prefix: 'MainBreadcrumbItem'
	},

	fields: [{
		name: 'url',
		type: 'string'
	}]

});