
Ext.define('Scrum.sim.resource.PersonnelSimlet', {

	extend: 'Scrum.sim.BaseSimlet',
	requires: ['Ext.ux.ajax.SimManager'],

	init() {
		this.data = [];

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		}

		function getRandomArrayItem(arr) {
			return arr[getRandomInt(0, arr.length - 1)];
		}

		function getRandomName(names) {
			return [getRandomArrayItem(names.last), getRandomArrayItem(names.first)].join(' ');
		}

		const names = {
			first: ['Петр', 'Иван', 'Василий', 'Мария', 'Ольга', 'Федор'],
			last: ['Петров', 'Иванов', 'Сидоров', 'Калашников', 'Хлебников', 'Собакевич']
		};

		for (let i = 0; i < 2365; i++) {
			this.data.push({
				id: i + 1,
				name: getRandomName(names),
				email: "jeanluc.picard@enterprise.com",
				teamId: getRandomArrayItem([1, 2, 3, 4]),
				roleId: getRandomArrayItem([1, 2, 3, 4, 5])
			});
		}

	}

}, Simlet => {
	Ext.ux.ajax.SimManager.register(Simlet.create());
});