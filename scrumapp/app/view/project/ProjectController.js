
Ext.define('Scrum.view.project.ProjectController', {

	extend: 'Ext.app.ViewController',
	alias: 'controller.project',
	requires: ['Scrum.model.resource.Project'],

	init(view) {
		view.on('render', () => view.setLoading('Загрузка проекта...'));
	},

	initViewModel(vm) {
		vm.bind('{project}', 'onProjectLoad', this);
		vm.linkTo('project', {
			type: 'resource.Project',
			id: this.getView().getProjectId()
		});
	},

	onProjectLoad(project) {
		const view = this.getView();
		view.loaded = true;
		view.setLoading(false);
		this.fireViewEvent('load', project);
	}

});