
Ext.define('Scrum.sim.resource.TeamSimlet', {

	extend: 'Scrum.sim.BaseSimlet',
	requires: ['Ext.ux.ajax.SimManager'],
	uses: [
		'Scrum.sim.resource.PersonnelSimlet',
		'Scrum.sim.resource.ProjectSimlet'
	],

	teams: [{
		id: 1,
		name: 'Ферст'
	}, {
		id: 2,
		name: 'Нонейм'
	}, {
		id: 3,
		name: 'Свободная команда'
	}],

	data(ctx) {

		const projectSimlet = this.manager.findSimlet(Scrum.sim.resource.ProjectSimlet);

		let data = this.teams;

		if (ctx && 'filter' in ctx.params) {
			// Отфильтровать свободные команды (незакрепленные за проектами).
			const freeFilter = Ext.decode(ctx.params.filter).find(f => f.property === 'free');
			if (freeFilter && freeFilter.value === true) {
				const projects = projectSimlet.data();
				data = this.teams.filter(team => !projects.find(project => team.id === project.teamId));
			}
			// Добавить выбранную в фильтре orTeamId команду.
			const orTeamIdFilter = Ext.decode(ctx.params.filter).find(f => f.property === 'orTeamId');
			if (orTeamIdFilter) {
				const orTeam = this.teams.find(team => team.id === orTeamIdFilter.value);
				data = data.concat(orTeam || []);
			}
		}

		// Подсчитать количество сотрудников в команде.
		data.map(team => Ext.apply(team, {
			personnelCount: this.getPersonnelCount(team.id)
		}));

		return data;
	},

	getPersonnelCount(teamId) {
		const personnelSimlet = this.manager.findSimlet(Scrum.sim.resource.PersonnelSimlet);
		const personnelSimletData = Ext.isFunction(personnelSimlet.data) ? personnelSimlet.data() : personnelSimlet.data;
		return personnelSimletData.filter(personnel => personnel.teamId === teamId).length;
	}

}, Simlet => {
	Ext.ux.ajax.SimManager.register(Simlet.create());
});