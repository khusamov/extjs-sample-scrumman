
Ext.define('Scrum.view.main.Main', {

	extend: 'Ext.panel.Panel',
	xtype: 'app-main',

	requires: [
		'Ext.layout.container.HBox',
		'Ext.layout.container.VBox',
		'Ext.container.Container',

		'Scrum.view.main.MainController',
		'Scrum.view.main.MainModel',
		'Scrum.view.main.cardPanel.MainCardPanel',
		'Scrum.view.main.sideBar.MainSideBar',

		// Перечисляем все виды, которые открываются (динамически создаются) из главного меню.
		'Scrum.view.roleList.RoleList',
		'Scrum.view.personnelList.PersonnelList',
		'Scrum.view.teamList.TeamList',
		'Scrum.view.projectList.ProjectList'
	],

	controller: 'main',
	viewModel: 'main',

	keyMap: {
		F1: 'onF1',
		F2: 'onF2',
		F5: 'onF5'
	},

	layout: {
		type: 'hbox',
		align: 'stretch'
	},
	items: [{
		xtype: 'mainsidebar'
	}, {
		xtype: 'maincardpanel',
		flex: 1
	}]

});
