
Ext.define('Scrum.model.resource.Team', {

	extend: 'Scrum.model.Base',

	fields: [{
		name: 'name',
		type: 'string'
	}, {
		/**
		 * Количество сотрудников в команде.
		 * Вычисляемое на сервере поле.
		 */
		name: 'personnelCount',
		type: 'integer'
	}, {
		/**
		 * Мощность команды. Единица измерения: часов/спринт.
		 * Показывает сколько часов выделено на один спринт для всей команды.
		 * Вычисляемое на клиенте поле по формуле:
		 * Количество сотрудников * Количество рабочих часов в сутки * Количество рабочих суток в одном спринте.
		 */
		name: 'power',
		type: 'integer',
		calculate: data => data.personnelCount * 8 * 14
	}]

});