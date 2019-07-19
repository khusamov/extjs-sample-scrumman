
Ext.define('Scrum.view.teamList.TeamList', {

	extend: 'Ext.grid.Panel',
	xtype: 'teamlist',
	requires: [
		'Ext.toolbar.Paging',
		'Eirc.toolbar.GridEdition',
		'Scrum.data.schema.BaseSchema',
		'Scrum.model.resource.Team',
		'Scrum.view.personnelList.TeamDialog'
	],

	viewModel: {
		schema: 'base',
		stores: {
			teamStore: {
				model: 'resource.Team',
				autoLoad: true
			}
		}
	},

	bind: {
		store: '{teamStore}'
	},

	columns: [{
		text: 'Название команды',
		dataIndex: 'name',
		flex: 1
	}, {
		text: 'Количество сотрудников',
		dataIndex: 'personnelCount',
		flex: 1
	}, {
		text: 'Мощность команды, часы/спринт',
		dataIndex: 'power',
		flex: 1
	}],

	tbar: {
		xtype: 'grideditiontoolbar',
		recordFormWindow: 'teamdialog'
	},

	bbar: {
		xtype: 'pagingtoolbar',
		displayInfo: true
	}

});