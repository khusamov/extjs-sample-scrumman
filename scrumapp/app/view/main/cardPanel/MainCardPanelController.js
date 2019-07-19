
Ext.define('Scrum.view.main.cardPanel.MainCardPanelController', {

	extend: 'Ext.app.ViewController',
	alias: 'controller.maincardpanel',
	requires: [
		'Ext.Object',
		'Scrum.view.project.Project'
	],

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
		const mainMenu = this.getMainMenu();
		mainMenu.waitForLoad().then(() => {
			const selectedMenuItem = mainMenu.findMenuItemByUrl(url);
			if (selectedMenuItem) {
				this.getView().setActiveCardByUrl(url, selectedMenuItem.getTabViewConfig());
			} else {
				Ext.Msg.alert('Ошибка в маршруте', `Карточка с адресом "${url}" не найдена.`);
			}
		});
	},

	onEmptyRoute() {
		this.getView().hideActiveCard();
	},

	onProjectRoute(url, projectId) {
		this.getView().setActiveCardByUrl(url, {
			xtype: 'project',
			projectId: Number(projectId).valueOf(),
			url
		});
	},

	onBeforeRemove(cardPanel, removedCard) {
		const removedCardUrl = this.findCardUrl(removedCard);
		delete this.getView().cards[removedCardUrl];
		if (!this.getView().getCardCount()) this.redirectTo('');
	},

	privates: {

		/**
		 * Главное меню приложения.
		 * @returns {Scrum.view.main.menu.MainMenu}
		 */
		getMainMenu() {
			return Scrum.getApplication().getMainView().getController().mainMenu;
		}

	}

});