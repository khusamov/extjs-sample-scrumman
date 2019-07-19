
/**
 * Специальная схема для тех моделей, которые наследуются
 * от Ext.data.TreeModel.
 */
Ext.define('Scrum.data.schema.TreeSchema', {

	extend: 'Scrum.data.schema.BaseSchema',
	alias: 'schema.tree',
	requires: ['Ext.data.identifier.Sequential'],

	defaultIdentifier: {
		type: 'sequential',
		prefix: 'Node'
	},

	proxy: {
		reader: {
			rootProperty: ''
		}
	}

});