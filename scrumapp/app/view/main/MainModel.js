
Ext.define('Scrum.view.main.MainModel', {

	extend: 'Ext.app.ViewModel',
	alias: 'viewmodel.main',

	data: {
		application: {
			name: 'MyScrum',
			description: `
				Управление разработкой ПО по методике Scrum (https://goo.gl/iy99Lm). 
				Учебное приложение для изучения Sencha ExtJS
			`,
			/**
			 * Данная переменная содержит данные из файла app.json
			 * и заполняется в методе Scrum.Application.launch().
			 * @param {Object|null}
			 */
			info: null
		}
	}

});