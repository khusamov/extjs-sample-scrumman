
Ext.define('Scrum.view.main.breadcrumb.MainBreadcrumbController', {

	extend: 'Ext.app.ViewController',
	alias: 'controller.mainbreadcrumb',
	requires: [
		'Ext.Promise',
		'Scrum.model.MainBreadcrumb',
		'Scrum.model.resource.Project'
	],

	listen: {
		global: {
			unmatchedroute: 'onUnmatchedRoute'
		}
	},

	routes: {
		'(project/:id):tab': {
			action: 'onProjectRoute',
			conditions: {
				':tab': '(?:(?:\\/){1}([%a-z0-9_,\\s\\-]+))?'
			}
		}
	},

	onUnmatchedRoute(url) {
		const mainMenu = this.getMainMenu();
		if (url) Ext.create('Ext.Promise', resolve => {
			if (mainMenu.loaded) resolve(); else mainMenu.on('load', resolve);
		}).then(() => {
			const selectedMenuItem = mainMenu.findMenuItemByUrl(url);
			if (selectedMenuItem) {
				this.setActiveNodeByUrl(url, {
					text: selectedMenuItem.getTabViewConfig().title,
					url
				});
			}
		});
	},

	onProjectRoute(url, projectId, tab) {
		this.loadProject(projectId).then(project => {
			if (!this.getView().getNodeByUrl('projectlist')) {
				this.getView().getStore().getRoot().appendChild(Ext.create('Scrum.model.MainBreadcrumb', {
					text: 'Проекты',
					url: 'projectlist'
				}));
			}
			this.setActiveNodeByUrl(url, {
				parent: this.getView().getNodeByUrl('projectlist'),
				text: project.get('name'),
				url,
				tab
			});
		});
	},

	onSelectionChange(mainBreadcrumb, node) {
		if (node && !node.isRoot()) {
			const url = [node.get('url'), node.get('tab')].filter(p => p).join('/');
			this.redirectTo(url);
		}
	},

	privates: {

		loadProject(id) {
			this._projects = this._projects || {}; // Кеширование записей по projectId.
			return Ext.create('Ext.Promise', resolve => {
				if (this._projects[id]) {
					resolve(this._projects[id]);
				} else {
					Scrum.model.resource.Project.load(id, {
						success: project => {
							this._projects[id] = project;
							resolve(project);
						}
					});
				}
			});
		},

		setActiveNodeByUrl(url, nodeConfig) {
			const view = this.getView();
			const parent = nodeConfig.parent || view.getStore().getRoot();
			let nodeConfigCloned = Ext.clone(nodeConfig);
			delete nodeConfigCloned.parent;
			const node = (
				view.getNodeByUrl(url) ||
				parent.appendChild(Ext.create('Scrum.model.MainBreadcrumb', nodeConfigCloned))
			);
			node.set('tab', nodeConfig.tab);
			return view.setActiveNode(node);
		},

		/**
		 * Главное меню приложения.
		 * @returns {Scrum.view.main.menu.MainMenu}
		 */
		getMainMenu() {
			return Scrum.getApplication().getMainView().getController().mainMenu;
		}

	}

});