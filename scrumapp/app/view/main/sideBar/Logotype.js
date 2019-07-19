
Ext.define('Scrum.view.main.sideBar.Logotype', {

	extend: 'Ext.Component',
	xtype: 'logotype',

	padding: 26,

	style: {
		fontSize: '200%',
		fontWeight: 'bold',
		lineHeight: 'normal',
		color: '#fff0f0',
		backgroundColor: '#e00303',
		cursor: 'pointer'
	},

	controller: {
		onClick() {
			this.redirectTo('');
		}
	},

	listeners: {
		click: {
			fn: 'onClick',
			element: 'el'
		}
	}

});