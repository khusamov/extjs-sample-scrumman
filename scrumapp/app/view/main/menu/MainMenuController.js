
Ext.define('Scrum.view.main.menu.MainMenuController', {

	extend: 'Ext.app.ViewController',
	alias: 'controller.mainmenu',

	listen: {
		global: {
			unmatchedroute(url) {
				this[url ? 'onUnmatchedRoute' : 'onEmptyRoute'](url);
			}
		}
	},

	routes: {
		'(project/:id):tab': {
			action: 'onProjectRoute',
			conditions: {
				':tab': '(?:(?:\\/){1}([%a-z0-9_,\\s\\-]+))?'
			}
		}
	},

	onUnmatchedRoute(url) {
		this.getView().waitForLoad().then(() => {
			this.getView().setActiveMenuItemByUrl(url);
		});
	},

	onEmptyRoute() {
		this.getView().clearSelection();
	},

	onProjectRoute() {
		this.getView().clearSelection();
	},

	onMainMenuStoreLoad(mainMenuStore) {
		this.getView().loaded = true;
		this.fireViewEvent('load', mainMenuStore);
	}

});