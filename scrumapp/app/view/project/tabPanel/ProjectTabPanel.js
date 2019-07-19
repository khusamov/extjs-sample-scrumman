
Ext.define('Scrum.view.project.tabPanel.ProjectTabPanel', {

	extend: 'Ext.tab.Panel',
	xtype: 'projecttabpanel',
	controller: 'projecttabpanel',
	requires: [
		'Scrum.view.project.tabPanel.ProjectTabPanelController',
		'Scrum.view.project.sprintList.SprintList',
		'Scrum.view.project.taskList.ProjectTaskList',
		'Scrum.view.personnelList.PersonnelList'
	],

	listeners: {
		tabchange: 'onTabChange'
	},

	items: [{
		title: 'Команда',
		xtype: 'personnellist',
		bind: {
			filters: [{
				property: 'teamId',
				value: '{project.teamId}'
			}]
		}
	}, {
		title: 'Задачи проекта',
		xtype: 'projecttasklist',
		bind: {
			filters: [{
				property: 'projectId',
				value: '{project.id}'
			}]
		}
	}, {
		title: 'Спринты',
		xtype: 'sprintlist',
		bind: {
			filters: [{
				property: 'projectId',
				value: '{project.id}'
			}]
		}
	// }, {
	// 	title: 'Диаграмма сгорания'
	}]

});