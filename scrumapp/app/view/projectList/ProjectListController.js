
Ext.define('Scrum.view.projectList.ProjectListController', {

	extend: 'Ext.app.ViewController',
	alias: 'controller.projectlist',

	isTeamStoreLoaded: false,

	onTeamStoreLoad(teamStore) {
		teamStore.$loaded = true;
		this.getView().getStore().load();
	},

	teamIdRenderer(teamId) {
		let result = 'Данные загружаются...';
		const teamStore = this.getStore('teamStore');
		if (teamStore.$loaded) {
			if (teamId) {
				const team = teamStore.findRecord('id', teamId);
				result = team ? team.get('name') : `<Не найдена команда с id = ${teamId}>`;
			} else {
				result = '<Не назначена>';
			}
		}
		return result;
	},

	onItemDblClick() {
		this.redirectToSelectedRecord();
	},

	onOpenButtonClick() {
		this.redirectToSelectedRecord();
	},

	redirectToSelectedRecord() {
		// this.redirectTo(`project/${this.getView().getSelection()[0].getId()}`);
		// Интересная возможность, вместо URL подставлять модель, а URL будет узнан посредством вызова toUrl() у модели.
		// См. https://goo.gl/N4mhEp
		this.redirectTo(this.getView().getSelection()[0]);
	},

	onGridEditionToolbarSubmit() {
		// После создания проекта таблицу с проектами следует перезагрузить, потому что
		// колонки Мощность и Количество сотрудников вычисляются на сервере.
		this.getView().getStore().load();
	}

});