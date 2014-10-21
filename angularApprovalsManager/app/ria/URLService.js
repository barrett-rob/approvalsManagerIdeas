'use strict'

// ria URL service

angular.module('URLService', [])
.config(function() {
	// TODO: get from local storage + tests
	self.url = 'http://example.com/foo'
})
.factory('getUrl', function() {
	return function() {
		return self.url
	}
})
.factory('setUrl', function() {
	return function(url) {
		self.url = url
		// TODO: store in local storage
	}
})