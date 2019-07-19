
/**
 * Внимание, данные класс имеет патч, см. Scrum.override.app.view.main.SideBar.
 */
Ext.define('Scrum.view.main.sideBar.MainSideBar', {

	extend: 'Ext.container.Container',
	xtype: 'mainsidebar',
	requires: [
		'Ext.container.Container',
		'Ext.layout.container.VBox',
		'Scrum.view.main.menu.MainMenu',
		'Scrum.view.main.sideBar.Logotype',
	],

	viewModel: {
		data: {
			micro: false,
			isMainMenuLoaded: false
		}
	},

	controller: {
		onMainMenuLoad() {
			this.getViewModel().set('isMainMenuLoaded', true);
		},
		onMainMenuSelectionChange(mainMenu, selectedMenuItem) {
			if (selectedMenuItem) this.redirectTo(selectedMenuItem.getUrl());
		}
	},

	config: {
		micro: false
	},

	hidden: true,

	bind: {
		hidden: '{!isMainMenuLoaded}'
	},

	updateMicro(micro) {
		this.getViewModel().set('micro', micro);
		this.setWidth(micro ? 44 : null);
	},

	toggleMicro() {
		this.setMicro(!this.getMicro());
	},

	layout: {
		type: 'vbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'logotype',
		bind: {
			html: '{application.name}',
			hidden: '{micro}'
		}
	}, {
		xtype: 'container',
		flex: 1,
		scrollable: 'y',
		style: {
			backgroundColor: '#32404e'
		},
		items: {
			xtype: 'mainmenu',
			bind: {
				micro: '{micro}'
			},
			listeners: {
				load: 'onMainMenuLoad',
				selectionchange: 'onMainMenuSelectionChange'
			}
		}
	}, {
		xtype: 'component',
		tpl: '{application} <br/> {extjs}',
		padding: 10,
		style: {
			color: 'rgb(57, 186, 191)',
			backgroundColor: '#32404e'
		},
		bind: {
			hidden: '{micro}',
			data: {
				application: '{application.info.name} version {application.info.version}',
				extjs: 'Ext JS version {@Ext.versions.ext.version}'
			}
		}
	}]

});