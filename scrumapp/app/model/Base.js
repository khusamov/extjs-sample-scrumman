
Ext.define('Scrum.model.Base', {

	extend: 'Ext.data.Model',
	requires: ['Scrum.data.schema.BaseSchema'],

	schema: 'base',

	/**
	 * Специальное поле для обмена ID с сервером.
	 * Симулятор сервера этот параметр настраивает у себя автоматически.
	 */
	clientIdProperty: 'clientId',

	fields: [{
		name: 'id',
		type: 'integer'
	}]

});