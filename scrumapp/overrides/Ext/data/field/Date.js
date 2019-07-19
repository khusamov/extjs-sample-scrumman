
Ext.define("Scrum.override.form.field.Date", {
	override: "Ext.data.field.Date",

	/**
	 * Формат даты для обмена с сервером.
	 */
	dateFormat: 'Y-m-d\\TH:i:s'

});