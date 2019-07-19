
Ext.define('Scrum.data.schema.BaseSchema', {

	extend: 'Ext.data.schema.Schema',
	alias: 'schema.base',
	requires: [
		'Ext.data.proxy.Rest',
		'Ext.data.reader.Json',
		'Ext.data.identifier.Sequential'
	],

	namespace: 'Scrum.model',

	/**
	 * У нас id имеет тип integer, а identifier (https://goo.gl/UPFMrH),
	 * встроенный в Ext.data.Model по умолчанию, генерирует текстовые
	 * значения id, что вызывает ошибки.
	 * Поэтому здесь определен числовой defaultIdentifier,
	 * который генерирует последовательность 1, 2, 3, ...
	 */
	defaultIdentifier: 'sequential',

	proxy: {
		type: 'rest',
		// Симулятор сервера не поддерживает appendId === true.
		appendId: false,
		reader: {
			type: 'json',
			// Симулятор сервера не поддерживает пустой rootProperty (возникают
			// проблемы при обновлении записей PUT-методом).
			rootProperty: 'data'
		}
	}

});