
Ext.define('Scrum.view.personnelList.TeamDialog', {

	extend: 'Scrum.window.DialogWindow',
	xtype: 'teamdialog',

	title: {
		insert: 'Новая команда',
		update: 'Команда «{name}»'
	},

	items: [{
		fieldLabel: 'Имя',
		allowBlank: false,
		name: 'name'
	}]

});