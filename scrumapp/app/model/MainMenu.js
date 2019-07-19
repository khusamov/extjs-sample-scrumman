
Ext.define('Scrum.model.MainMenu', {

	extend: 'Ext.data.TreeModel',
	requires: [
		'Scrum.data.schema.TreeSchema',
		'Scrum.data.field.Config'
	],

	schema: 'tree',

	identifier: {
		prefix: 'MainMenuItem'
	},

	fields: [{
		/**
		 * Может содержать xtype вида или его конфиг.
		 * На выходе всегда выдает конфиг вида вне зависимости изначально был задан конфигом или строкой с xtype-ом.
		 * Причем конфиг вида содержит в себе поле title, значение которого по умолчанию устанавливается из поля text.
		 * @field
		 */
		name: 'view',
		type: 'config'
	}, {
		/**
		 * Если не задан, то он равен xtype вида из поля view.
		 * Это реализовано в методе get().
		 * @field
		 */
		name: 'path',
		type: 'string'
	}],

	getTabViewConfig() {
		const config = Ext.apply({
			title: this.get('text'),
			iconCls: this.get('iconCls')
		}, Ext.clone(this.get('view')));
		config.url = this.getUrl();
		return config;
	},

	/**
	 * Получить полный путь к узла на основе поля path (без корня и без первого слеша).
	 * Если full === false, то из URL узла удаляется корневой узел и первый слеш.
	 * @param {Boolean} full
	 * @returns {String}
	 */
	getUrl(full = false) {
		let url = this.getPath('path');
		if (!full) url = url.split('/').slice(2).join('/');
		return url;
	},

	get(fieldName) {
		let value = this.callParent(arguments);
		// Если значение поля path пустое, то подменяем его на xtype вида.
		// Иными словами поле path по умолчанию равно xtype вида.
		value = fieldName === 'path' ? (value || this.get('view').xtype) : value;
		return value;
	}

});