
Ext.define('Scrum.view.project.Project', {

	extend: 'Ext.panel.Panel',
	xtype: 'project',
	viewModel: 'project',
	controller: 'project',
	requires: [
		'Ext.Promise',
		'Ext.tab.Panel',
		'Ext.grid.Panel',
		'Ext.layout.container.Fit',
		'Scrum.view.project.ProjectModel',
		'Scrum.view.project.ProjectController',
		'Scrum.view.project.tabPanel.ProjectTabPanel'
	],

	/**
	 * Событие load генерируется в момент загрузки данных о проекте.
	 * @event load
	 * @param {Scrum.view.project.Project} projectPanel
	 * @param {Scrum.model.resource.Project} project
	 */

	title: 'Проект',
	layout: 'fit',

	loaded: false,

	bind: {
		title: 'Проект «{project.name}»'
	},

	config: {
		projectId: null
	},

	updateProjectId(projectId) {
		this.getViewModel().set('projectId', projectId);
	},

	items: {
		xtype: 'projecttabpanel'
	},

	/**
	 * Получить ссылку на запись проекта.
	 * @returns {Scrum.model.resource.Project}
	 */
	getProject() {
		return this.getViewModel().get('project');
	},

	/**
	 * Обещание выполнить код, если проект был загружен
	 * или после того, когда он загрузится.
	 * @returns {Ext.Promise<Scrum.model.resource.Project>}
	 */
	waitForLoad() {
		return Ext.create('Ext.Promise', resolve => {
			if (this.loaded) resolve(this.getProject()); else this.on('load', (view, project) => resolve(project), null, {
				single: true
			});
		});
	},

	/**
	 * Специальный метод для обновления содержимого вкладок по нажатию
	 * кнопки F5 из контроллера главного вида.
	 */
	reload() {
		const activeTab = this.down('projecttabpanel').getActiveTab();
		if (activeTab instanceof Ext.grid.Panel) activeTab.getStore().load();
	}

});