
Ext.define('Scrum.sim.resource.ProjectTaskSimlet', {

	extend: 'Scrum.sim.BaseSimlet',
	requires: ['Ext.ux.ajax.SimManager'],

	data: [{
		id: 1,
		name: 'Задача 1',
		duration: 20,
		projectId: 1
	}, {
		id: 2,
		name: 'Задача 2',
		duration: 20,
		projectId: 1
	}, {
		id: 3,
		name: 'Задача 3',
		duration: 20,
		projectId: 1
	}]

}, Simlet => {
	Ext.ux.ajax.SimManager.register(Simlet.create());
});