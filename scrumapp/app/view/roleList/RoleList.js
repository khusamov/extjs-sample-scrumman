
Ext.define('Scrum.view.roleList.RoleList', {

	extend: 'Ext.grid.Panel',
	xtype: 'rolelist',
	requires: [
		'Ext.data.proxy.Memory',
		'Ext.grid.plugin.CellEditing',
		'Ext.form.field.Text',
		'Ext.form.field.ComboBox',
		'Eirc.toolbar.GridEdition',
		'Scrum.data.schema.BaseSchema',
		'Scrum.model.resource.Role'
	],

	viewModel: {
		schema: 'base',
		stores: {
			roleStore: {
				model: 'resource.Role',
				autoLoad: true,
				autoSync: true,
				pageSize: 0
			}
		}
	},

	bind: {
		store: '{roleStore}'
	},

	selModel: {
		mode: 'multi'
	},

	plugins: 'cellediting',

	columns: [{
		text: 'Название роли',
		dataIndex: 'name',
		flex: 1,
		editor: 'textfield'
	}, {
		text: 'Группа',
		dataIndex: 'group',
		flex: 1,
		editor: {
			xtype: 'combobox',
			hideLabel: true,
			queryMode: 'local',
			displayField: 'name',
			valueField: 'id',
			editable: false,
			store: ['Свиньи', 'Куры']
		}
	}],

	tbar: {
		xtype: 'grideditiontoolbar'
	}

});