
Ext.define('Scrum.view.main.menu.MainMenuModel', {

	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.mainmenu',
	requires: [
		'Ext.data.TreeStore',
		'Scrum.data.schema.TreeSchema',
		'Scrum.model.MainMenu'
	],

	schema: 'tree',

	stores: {
		mainMenuStore: {
			type: 'tree',
			model: 'MainMenu',
			autoLoad: true,
			listeners: {
				load: 'onMainMenuStoreLoad'
			}
		}
	}

});