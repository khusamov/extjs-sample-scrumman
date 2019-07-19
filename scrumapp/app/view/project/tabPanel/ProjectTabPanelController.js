
Ext.define('Scrum.view.project.tabPanel.ProjectTabPanelController', {

	extend: 'Ext.app.ViewController',
	alias: 'controller.projecttabpanel',
	requires: ['Ext.Template'],

	init() {
		this.getProjectView().waitForLoad().then(project => {
			// Добавить маршрут для вкладок проекта.
			// В маршрут номер проекта встраиваем как константу.
			this.setRoutes({
				[`project/${project.getId()}/:tab`]: 'onProjectRoute'
			});
			this.redirectToCurrentUrl();
			// Проставить счетчики на вкладках.
			this.initTabCounters(project);
		});
	},

	onProjectRoute(tab) {
		this.getView().setActiveTab(this.getView().down(tab));
	},

	onTabChange(tabPanel, card) {
		const project = this.getProjectView().getProject();
		const url = [project.toUrl(), card.getXType()].join('/');
		this.redirectTo(url);
	},

	privates: {

		getProjectView() {
			return this.getView().up('project');
		},

		redirectToCurrentUrl() {
			this.redirectTo(location.hash.slice(1), {force: true});
		},

		initTabCounters(project) {
			const view = this.getView();
			const counterTpl = Ext.create('Ext.Template', 'TabCounters.project{projectId}.{counterName}');

			// Получаем массив вкладок.
			const tabs = [];
			view.items.each(tab => tabs.push({view: tab}));

			// На основе массива вкладок рассчитываем связывание с title, куда включаем имя счетчика.
			tabs
				.map(tab => Ext.apply(tab, {
					xtype: tab.view.getXType(),
					title: tab.view.getTitle(),
					counterName: (() => {
						let className = tab.view.self.getName().split('.');
						return Ext.String.uncapitalize(className[className.length - 1]);
					})()
				}))
				.map(tab => Ext.apply(tab, {
					counterFullName: counterTpl.apply({
						projectId: project.getId(),
						counterName: tab.counterName
					})
				}))
				.map(tab => Ext.apply(tab, {
					bindTitle: `${tab.title}{${tab.counterFullName} ? ' (' + ${tab.counterFullName} + ')' : ''}`
				}))
				.forEach(tab => {
					view.down(tab.xtype).setBind({title: tab.bindTitle});
				});
		}

	}

});