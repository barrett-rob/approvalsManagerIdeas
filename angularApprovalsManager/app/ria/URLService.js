'use strict'

// ria URL service

angular.module('URLService', [])
.factory('getUrl', function() {
	return function() {
		return 'http://foo.example.com';
	}
})