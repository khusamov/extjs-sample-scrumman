
Ext.define('Scrum.view.main.menu.MainMenu', {

	extend: 'Ext.list.Tree',
	xtype: 'mainmenu',
	viewModel: 'mainmenu',
	controller: 'mainmenu',
	requires: [
		'Ext.Promise',
		'Scrum.view.main.menu.MainMenuModel',
		'Scrum.view.main.menu.MainMenuController'
	],

	/**
	 * @event load
	 * @param {Scrum.view.main.menu.MainMenu} mainMenu
	 * @param {Ext.data.Store} mainMenuStore
	 */

	ui: 'nav',
	rootVisible: false,
	bind: {
		store: '{mainMenuStore}'
	},

	loaded: false,

	clearSelection() {
		this.setSelection(null);
	},

	setActiveMenuItemByUrl(url) {
		const selectedMenuItem = this.findMenuItemByUrl(url);
		if (selectedMenuItem) this.setSelection(selectedMenuItem);
	},

	findMenuItemByUrl(url) {
		const store = this.getStore();
		const findNodeIndex = store.findBy(node => node.getUrl() === url);
		return findNodeIndex === -1 ? null : store.getAt(findNodeIndex);
	},

	/**
	 * Обещание выполнить код, если меню было загружено
	 * или после того, когда оно загрузится.
	 * @returns {Ext.Promise}
	 */
	waitForLoad() {
		return Ext.create('Ext.Promise', resolve => {
			if (this.loaded) resolve(); else this.on('load', resolve, null, {single: true});
		});
	}

});