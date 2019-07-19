
Ext.define('Scrum.sim.tree.MainMenuSimlet', {

	extend: 'Ext.ux.ajax.JsonSimlet',
	requires: ['Ext.ux.ajax.SimManager'],

	url: '/MainMenu',

	data: {
		expanded: true,
		path: 'root',
		children: [{
			text: 'Роли',
			view: 'rolelist',
			iconCls: 'x-fa fa-address-book',
			leaf: true
		}, {
			text: 'Сотрудники',
			view: 'personnellist',
			iconCls: 'x-fa fa-users',
			leaf: true
		}, {
			text: 'Команды',
			view: 'teamlist',
			iconCls: 'x-fa fa-steam',
			leaf: true
		}, {
			text: 'Проекты',
			view: 'projectlist',
			iconCls: 'x-fa fa-book',
			leaf: true
		}]
	}

}, Simlet => {
	Ext.ux.ajax.SimManager.register(Simlet.create());
});