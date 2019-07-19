
// WAI-ARIA (https://goo.gl/74tCLq) compatibility warnings
// can be suppressed by adding the following to application startup code:
Ext.ariaWarn = Ext.emptyFn;

Ext.application({

	name: 'Scrum',
	extend: 'Scrum.Application',
	mainView: 'Scrum.view.main.Main',
	requires: [
		'Scrum.view.main.Main',
		'Ext.ux.ajax.SimManager',
		'Eirc.autoTestId.Generator'
	],

	init() {
		// Настройка симулятора сервера.
		// Подробнее о настройке симулятора сервера читайте
		// в файле: `packages/local/scrumapp-sim/Readme.md`.
		Ext.ux.ajax.SimManager.init({
			delay: 150
		});

		// Настройка автогенерации ID для автотестов.
		// Подробнее о настройке генератора читайте
		// в файле: `packages/local/autotestid/Readme.md`.
		Eirc.autoTestId.Generator.init({
			abbreviations: [
				'headercontainer:',
				'app-main: main',
				'main-maincardpanel-teamlist: teamlist',
				'main-maincardpanel-project-projecttabpanel: main-maincardpanel-projecttabpanel'
			],
			listeners: {
				generate(autoTestId) {
					// Контроль ID в консоли браузера.
					console.log('AutoTestId', '|', autoTestId);
				}
			}
		});
	}

});