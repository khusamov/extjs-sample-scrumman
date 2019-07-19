
/**
 * Компонент хлебных крошек спроектирован так, что по сути дублирует
 * маршрутизацию из контроллера главного вида. Это удобно тем, что
 * вся логика работы хлебных крошек заключена в одном классе
 * Scrum.view.main.breadcrumb.MainBreadcrumbController.
 */
Ext.define('Scrum.view.main.breadcrumb.MainBreadcrumb', {

	extend: 'Ext.toolbar.Breadcrumb',
	xtype: 'mainbreadcrumb',
	viewModel: 'mainbreadcrumb',
	controller: 'mainbreadcrumb',
	requires: [
		'Scrum.view.main.breadcrumb.MainBreadcrumbModel',
		'Scrum.view.main.breadcrumb.MainBreadcrumbController'
	],

	showIcons: true,
	showMenuIcons: true,
	padding: 6,
	hidden: true,

	updateSelection(node, prevNode) {
		if (node !== prevNode) {
			this.callParent(arguments);

			// Скрыть корневой узел (аля опция rootVisible: false).
			const first = this.items.first();
			if (first) first.hide();
		}
	},

	listeners: {
		selectionchange: 'onSelectionChange'
	},

	bind: {
		store: '{mainBreadcrumbStore}'
	},

	setActiveNode(node) {
		this.setSelection(node);
		this.setHidden(node.parentNode.isRoot());
		return node;
	},

	getActiveNode() {
		return this.getSelection();
	},

	getNodeByUrl(url) {
		return this.getStore() ? this.getStore().getRoot().findChild('url', url, true) : null;
	}

});