'use strict'

// ria settings service

angular.module('RIASettingsService', [])
.config(function() {
	self.settings = {}
	// TODO: get from local storage + tests
	self.settings.url = 'http://ellipseonlineb0-el8dev-epsprd2-eps-prod.techops.ventyx.abb.com:8080/ria'
	self.settings.username = 'AM2122'
	self.settings.password = ''
	self.settings.position = ''
	self.settings.district = 'R100'
	self.settings.employeeId = 'NINES'
})
.factory('getSettings', function() {
	return function() {
		return self.settings
	}
})
.factory('setSettings', function() {
	return function(s) {
		self.settings = s
		// TODO: store in local storage
	}
})