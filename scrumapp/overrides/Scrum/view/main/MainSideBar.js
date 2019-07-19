
/**
 * Патч, исправляющий вычисление ширины главного меню.
 * Без патча ширина меню меньше родительского контейнера на 1 пиксель.
 */
Ext.define('Scrum.override.view.main.MainSideBar', {

	override: 'Scrum.view.main.sideBar.MainSideBar',

	initComponent() {
		this.callParent(arguments);

		this.on({
			afterrender: () => {
				const mainMenu = this.down('mainmenu');
				(setNullWidth => {
					if (mainMenu.loaded) setNullWidth(); else mainMenu.on('load', setNullWidth, null, {single: true});
				})(() => {
					this.setWidth(null);
				});

				// Этот вариант почему-то не работает.
				// this.on({
				// 	afterrender: () => this.down('mainmenu').waitForLoad().then(() => this.setWidth(null)),
				// 	resize: () => this.setWidth(this.getWidth())
				// });
			},
			resize: () => this.setWidth(this.getWidth())
		});
	}

});



