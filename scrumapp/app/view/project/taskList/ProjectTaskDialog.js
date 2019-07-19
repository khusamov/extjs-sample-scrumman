
/**
 * Форма для создания или обновления записи Задача проекта.
 * Контроллер формы сам отправляет на сервер запросы на создание/обновление.
 * На вход формы следует подать record (либо новый, либо имеющийся из сторе).
 */
Ext.define('Scrum.view.project.taskList.ProjectTaskDialog', {

	extend: 'Scrum.window.DialogWindow',
	xtype: 'projecttaskdialog',

	title: {
		insert: 'Новая задача',
		update: 'Задача «{name}»'
	},

	items: [{
		fieldLabel: 'Название задачи',
		allowBlank: false,
		name: 'name'
	}, {
		fieldLabel: 'Длительность, часы',
		name: 'duration'
	}]

});