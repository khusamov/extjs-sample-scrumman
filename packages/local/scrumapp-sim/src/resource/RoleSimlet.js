
Ext.define('Scrum.sim.resource.RoleSimlet', {

	extend: 'Scrum.sim.BaseSimlet',
	requires: ['Ext.ux.ajax.SimManager'],

	data: [{
		id: 1,
		name: 'Скрам-мастер',
		group: 'Свиньи'
	}, {
		id: 2,
		name: 'Владелец продукта',
		group: 'Свиньи'
	}, {
		id: 3,
		name: 'Разработчик',
		group: 'Свиньи'
	}, {
		id: 4,
		name: 'Пользователь',
		group: 'Куры'
	}, {
		id: 5,
		name: 'Эксперт',
		group: 'Куры'
	}]

}, Simlet => {
	Ext.ux.ajax.SimManager.register(Simlet.create());
});