'use strict'

// ria http service

angular.module('HttpService', [ 'URLService' ])
.factory('login', [ '$http', 'getUrl', function($http, getUrl) {
	return function(args) {
		// get credentials
		// create interaction object
		var interaction = {}
		var response = 'foo'
		// execute post
		$http.post(getUrl(), interaction)
		.success(function(data, status, headers, config) {
	  		// populate response object
			var x2js = new X2JS()
			var json = x2js.xml_str2json(data)
	  		response = json.actions.action
	 		// populate messages
		})
		.error(function(data, status, headers, config) {
			// populate error messages
		})
		return response;
	}
}])
