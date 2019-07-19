
Ext.define('Scrum.view.personnelList.PersonnelList', {

	extend: 'Ext.grid.Panel',
	xtype: 'personnellist',
	controller: 'personnellist',
	viewModel: 'personnellist',
	requires: [
		'Ext.toolbar.Paging',
		'Eirc.toolbar.GridEdition',
		'Scrum.view.personnelList.PersonnelListModel',
		'Scrum.view.personnelList.PersonnelListController',
		'Scrum.view.personnelList.PersonnelDialog'
	],

	config: {
		filters: []
	},

	updateFilters(filters) {
		this.getController().onFiltersChange(filters);
	},

	bind: {
		store: '{personnelStore}'
	},

	columns: [{
		text: 'Имя',
		dataIndex: 'name',
		flex: 1
	}, {
		text: 'Почта',
		dataIndex: 'email',
		flex: 1
	}, {
		text: 'Роль',
		dataIndex: 'roleId',
		flex: 1,
		renderer: 'roleIdRenderer'
	}, {
		text: 'Группа',
		dataIndex: 'roleGroup',
		flex: 1,
		renderer: 'roleGroupRenderer'
	}, {
		text: 'Команда',
		dataIndex: 'teamId',
		flex: 1,
		renderer: 'teamIdRenderer'
	}],

	tbar: {
		xtype: 'grideditiontoolbar',
		recordFormWindow: 'personneldialog'
	},

	bbar: {
		xtype: 'pagingtoolbar',
		displayInfo: true
	}

});