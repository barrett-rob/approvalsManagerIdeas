'use strict'

angular.module('RIAURLService', [])
.config(function() {
	// TODO: get from local storage + tests
	self.url = 'http://localhost:8083/ria'
})
.factory('getUrl', function() {
	return function() {
		return self.url
	}
})
.factory('setUrl', function() {
	return function(u) {
		self.url = u
		// TODO: store in local storage
	}
})