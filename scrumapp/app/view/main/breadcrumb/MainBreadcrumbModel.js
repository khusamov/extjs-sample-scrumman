
Ext.define('Scrum.view.main.breadcrumb.MainBreadcrumbModel', {

	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.mainbreadcrumb',
	requires: ['Ext.data.TreeStore'],

	stores: {
		mainBreadcrumbStore: {
			type: 'tree',
			root: {}
		}
	}

});