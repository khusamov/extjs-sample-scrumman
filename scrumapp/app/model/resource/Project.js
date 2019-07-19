
Ext.define('Scrum.model.resource.Project', {

	extend: 'Scrum.model.Base',
	requires: ['Scrum.model.resource.Team'],

	fields: [{
		name: 'name',
		type: 'string'
	}, {
		/**
		 * Количество сотрудников в команде teamId.
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
	}, {
		name: 'teamId',
		type: 'integer',
		reference: 'Team'
	}, {
		/**
		 * Дата начала проекта.
		 */
		name: 'started',
		type: 'date'
	}]

});