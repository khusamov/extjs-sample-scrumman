
/**
 * Карточки главного вида.
 */
Ext.define('Scrum.view.main.cardPanel.MainCardPanel', {

	extend: 'Ext.panel.Panel',
	xtype: 'maincardpanel',
	controller: 'maincardpanel',
	requires: [
		'Ext.grid.Panel',
		'Ext.layout.container.Card',
		'Scrum.view.main.cardPanel.MainCardPanelController',
		'Scrum.view.main.breadcrumb.MainBreadcrumb'
	],

	listeners: {
		beforeremove: 'onBeforeRemove'
	},

	layout: 'card',

	config: {
		mainBreadcrumb: {
			xtype: 'mainbreadcrumb'
		}
	},

	applyMainBreadcrumb(crumb) {
		return Ext.apply(crumb.isBreadcrumb ? crumb : Ext.create(crumb), {
			dock: 'top'
		});
	},

	items: {
		itemId: 'defaultCard',
		xtype: 'component',
		// TODO Перенести backgroundColor в стилевой файл
		// Для этого компонент надо вытащить в отдельный файл и создать для него SCSS-стиль.
		// В стилевом файле сделать зависимости backgroundColor от $base-color.
		// Аналогичные действия сделать для Scrum.view.main.sideBar.Logotype и Scrum.view.main.sideBar.SideBar.
		style: {
			backgroundColor: '#39babf'
		}
	},

	/**
	 * Карточки главного вида.
	 * Ассоциативный массив вида url -> карточка.
	 * @property {Object} cards
	 * @property {Ext.Component} cards.<url>
	 */
	cards: {},

	reloadActiveCard() {
		const card = this.getActiveCard();
		if ('reload' in card) {
			card.reload();
		} else if (card instanceof Ext.grid.Panel) {
			card.getStore().load();
		}
	},

	getCardCount() {
		return Ext.Object.getKeys(this.cards).length;
	},

	setActiveCard(card) {
		this.getLayout().setActiveItem(card);
	},

	setActiveCardByUrl(url, config) {
		return this.setActiveCard(this.getCardByUrl(url) || this.addCard(url, config));
	},

	getActiveCard() {
		return this.getLayout().getActiveItem();
	},

	hideActiveCard() {
		this.setActiveCard(this.down('#defaultCard'));
	},

	getCardByUrl(url) {
		return this.cards[url];
	},

	addCard(url, card) {
		card = card.isComponent ? card : this.addCounterNameToTitleBind(card);
		card = this.cards[url] = this.add(card);
		// Добавление хлебных крошек.
		card.addDocked(this.getMainBreadcrumb(), 0);
		// Добавление кнопки Обновить.
		if ('reload' in card) {
			card.addTool({
				type: 'refresh',
				handler: () => card.reload()
			});
		} else if (card instanceof Ext.grid.Panel) {
			card.addTool({
				type: 'refresh',
				handler: () => card.getStore().load()
			});
		}
		return card;
	},

	privates: {

		/**
		 * Добавление связывания имени счетчика с title карточки.
		 * Срабатывает, если в приложение добавлен контроллер Scrum.controller.TabCounters.
		 * @param cardConfig
		 */
		addCounterNameToTitleBind(cardConfig) {
			const tabCountersController = Scrum.getApplication().getController('TabCounters', true);
			const TabCountersClass = tabCountersController ? Ext.ClassManager.getClass(tabCountersController) : null;
			if (TabCountersClass) {
				const bindConfig = {};
				const cardClassName = Ext.ClassManager.getByAlias(`widget.${cardConfig.xtype}`).getName();
				const counterName = TabCountersClass.getCounterName(cardClassName);
				// Если класс вкладки не содержит параметр title в bind, то добавляем свой со счетчиком.
				if (!('title' in (this.getConfigFromWidget(cardConfig.xtype).bind || {}))) {
					bindConfig.title = `${cardConfig.title}{${counterName} ? ' (' + ${counterName} + ')' : ''}`;
				}
				cardConfig.bind = Ext.apply(bindConfig, cardConfig.bind || {});
			}
			return cardConfig;
		},

		/**
		 * Получить конфиг из класса по его xtype.
		 * Внимание! Данная функция использует недокументированный приватный метод getConfigurator().
		 * @param xtype
		 * @returns {Object}
		 */
		getConfigFromWidget(xtype) {
			return Ext.ClassManager.getByAlias(`widget.${xtype}`).getConfigurator().values;
		}

	}

});