'use strict'

angular.module('RIACredentialsService', [])
.config(function() {
	self.credentials = {}
	// TODO: get from local storage + tests
	self.credentials.username = 'AM2122'
	self.credentials.password = ''
	self.credentials.position = ''
	self.credentials.scope = 'R100' // scope here is RIA scope - nothing to do with ng scope, just a name
})
.factory('getCredentials', function() {
	return function() {
		return self.credentials
	}
})
.factory('setCredentials', function() {
	return function(s) {
		self.credentials = s
		// TODO: store in local storage
	}
})