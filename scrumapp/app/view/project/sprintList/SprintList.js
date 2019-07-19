
Ext.define('Scrum.view.project.sprintList.SprintList', {

	extend: 'Ext.grid.Panel',
	xtype: 'sprintlist',
	requires: [
		'Ext.grid.column.Date',
		'Ext.grid.plugin.CellEditing',
		'Scrum.data.schema.BaseSchema',
		'Scrum.model.resource.Sprint'
	],

	viewModel: {
		schema: 'base',
		data: {
			sprintStoreFilters: []
		},
		stores: {
			sprintStore: {
				model: 'Scrum.model.resource.Sprint',
				autoLoad: true,
				pageSize: 0,
				remoteFilter: true,
				filters: '{sprintStoreFilters}'
			}
		}
	},

	controller: {
		onFiltersChange(filters) {
			this.getViewModel().set('sprintStoreFilters', filters);
		},
		onGridEditionToolbarInsert(record) {
			record.set('projectId', this.getView().lookupViewModel().get('project.id'));
		},
		onGridEditionToolbarAfterInsert() {
			this.getStore('sprintStore').load();
		}
	},

	config: {
		filters: []
	},

	updateFilters(filters) {
		this.getController().onFiltersChange(filters);
	},

	bind: {
		store: '{sprintStore}',
		selection: '{selection}'
	},

	selModel: {
		mode: 'multi'
	},

	columns: [{
		text: '№',
		dataIndex: 'number',
		flex: 1
	}, {
		text: 'Дата начала',
		xtype: 'datecolumn',
		dataIndex: 'started',
		flex: 1
	}, {
		text: 'Длительность, часы',
		dataIndex: 'power',
		flex: 1
	}],

	tbar: {
		xtype: 'grideditiontoolbar',
		listeners: {
			insert: 'onGridEditionToolbarInsert',
			afterinsert: 'onGridEditionToolbarAfterInsert'
		}
	}

});