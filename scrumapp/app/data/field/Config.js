
/**
 * Поле данного типа может содержать строку или объект с конфигурацией компонента.
 * Если значение строка, то оно конвертируется в объект вида { xtype: '<value>' }.
 */
Ext.define('Scrum.data.field.Config', {

	extend: 'Ext.data.field.Field',
	alias: 'data.field.config',

	isObject: true,
	isObjectField: true,

	getType() {
		return 'config';
	},

	convert(value) {
		return Ext.isObject(value) ? value : {
			xtype: value
		};
	}

});