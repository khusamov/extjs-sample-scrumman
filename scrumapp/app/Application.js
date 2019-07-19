
Ext.define('Scrum.Application', {

	extend: 'Ext.app.Application',
	name: 'Scrum',
	requires: [
		'Ext.plugin.Viewport',
		'Ext.window.MessageBox',
		'Scrum.util.AppJson'
	],

	controllers: ['StoreDependencies', 'TabCounters'],

	launch() {
		Scrum.util.AppJson.load().then(appJson => {
			this.getMainView().getViewModel().set('application.info', appJson);
		}).otherwise(err => {
			console.error('При загрузке информации о программе "app.json" произошла ошибка:');
			console.error(err);
		});
	},

	onAppUpdate: function () {
		Ext.Msg.confirm(
			'Новая версия приложения',
			'Загрузить новую версию приложения?',
			choice => {
				if (choice === 'yes') window.location.reload();
			}
		);
	}

});
