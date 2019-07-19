
Ext.define('Scrum.sim.resource.ProjectSimlet', {

	extend: 'Scrum.sim.BaseSimlet',
	requires: ['Ext.ux.ajax.SimManager'],
	uses: ['Scrum.sim.resource.TeamSimlet'],

	projects: [{
		id: 1,
		name: 'Претензионная исковая работа',
		started: '2013-03-22',
		teamId: 1
	}, {
		id: 2,
		name: 'Модуль договоров',
		started: '2016-03-22',
		teamId: 2
	}, {
		id: 3,
		name: 'Нормативно-справочная информация',
		started: '2019-01-01'
	}],

	data() {
		const teamSimlet = this.manager.findSimlet(Scrum.sim.resource.TeamSimlet);

		const data = this.projects;

		// Подсчитать количество сотрудников в команде проекта.
		data.map(project => Ext.apply(project, {
			started: new Date(project.started),
			personnelCount: teamSimlet.getPersonnelCount(project.teamId)
		}));

		return data;
	}

}, Simlet => {
	Ext.ux.ajax.SimManager.register(Simlet.create());
});