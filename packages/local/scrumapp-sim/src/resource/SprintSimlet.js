
Ext.define('Scrum.sim.resource.SprintSimlet', {

	extend: 'Scrum.sim.BaseSimlet',
	requires: [
		'Ext.ux.ajax.SimManager',
		'Scrum.sim.resource.ProjectSimlet'
	],

	sprints: [{
		id: 1,
		projectId: 1
	}, {
		id: 2,
		projectId: 1
	}, {
		id: 3,
		projectId: 1
	}, {
		id: 4,
		projectId: 2
	}],

	data() {
		const projectSimlet = this.manager.findSimlet(Scrum.sim.resource.ProjectSimlet);
		// const teamSimlet = this.manager.findSimlet(Scrum.sim.resource.TeamSimlet);

		// Расчет дополнительных полей спринтов.
		projectSimlet.data().map(project => {
			project.sprints = this.sprints.filter(sprint => sprint.projectId === project.id).map((sprint, index) => {

				// Порядковый номер.
				sprint.number = index + 1;

				// Дата начала спринта = Дата начала проекта + Длительность спринта * Порядковый номер спринта.
				sprint.started = new Date(project.started);
				sprint.started.setDate(sprint.started.getDate() + index * 14);
				// sprint.started = sprint.started.toDateString();

				// Длительность спринта = сумма длительностей задач, включенных в спринт.
				// sprint.power

			});
		});

		return this.sprints;
	}

}, Simlet => {
	Ext.ux.ajax.SimManager.register(Simlet.create());
});