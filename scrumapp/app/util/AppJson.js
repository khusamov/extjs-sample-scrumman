
Ext.define('Scrum.util.AppJson', {

	singleton: true,
	requires: ['Ext.Ajax'],

	load() {
		return (
			Ext.Ajax
				.request({
					url: 'app.json',
					nosim: true
				})
				.then(response => Ext.decode(response.responseText))
		);
	}

});