
Ext.define('Scrum.view.main.MainController', {

	extend: 'Ext.app.ViewController',
	alias: 'controller.main',
	requires: ['Scrum.view.project.Project'],

	/**
	 * @property {Scrum.view.main.SideBar}
	 */
	sideBar: null,

	/**
	 * @property {Scrum.view.main.menu.MainMenu}
	 */
	mainMenu: null,

	/**
	 * @property {Scrum.view.main.cardPanel.MainCardPanel}
	 */
	cardPanel: null,

	init(view) {
		this.sideBar = view.down('sidebar');
		this.mainMenu = view.down('mainmenu');
		this.cardPanel = view.down('maincardpanel');
	},

	onF1(event) {
		event.stopEvent();
		const name = this.getViewModel().get('application.name');
		const description = this.getViewModel().get('application.description');
		const version = this.getViewModel().get('application.info.version');
		Ext.Msg.alert('О программе', `${name} ${version} <br/> ${description} <br/> Ext JS version ${Ext.getVersion()}`);
	},

	onF2(event) {
		event.stopEvent();
		this.sideBar.toggleMicro();
	},

	onF5(event) {
		event.stopEvent();
		this.cardPanel.reloadActiveCard();
	}

});