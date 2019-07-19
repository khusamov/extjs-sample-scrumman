
Ext.define('Scrum.view.personnelList.PersonnelListModel', {

	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.personnellist',
	schema: 'base',
	requires: [
		'Scrum.data.schema.BaseSchema',
		'Scrum.model.resource.Personnel',
		'Scrum.model.resource.Role',
		'Scrum.model.resource.Team',
	],

	data: {
		personnelStoreFilters: []
	},

	stores: {
		personnelStore: {
			model: 'resource.Personnel',
			remoteFilter: true,
			filters: '{personnelStoreFilters}'
		},
		roleStore: {
			model: 'resource.Role',
			autoLoad: true,
			listeners: {
				load: 'onRoleStoreLoad'
			}
		},
		teamStore: {
			model: 'resource.Team',
			autoLoad: true,
			listeners: {
				load: 'onTeamStoreLoad'
			}
		}
	}

});