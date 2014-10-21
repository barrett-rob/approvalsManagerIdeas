'use strict'

// ria http service

angular.module('HttpService', [ 'URLService' ])
.factory('login', [ '$http', 'getUrl', function($http, getUrl) {
	return function(args, successCallback, errorCallback) {
		// get credentials
		// create interaction object
		var interaction = {}
		// execute post
		$http.post(getUrl(), interaction)
		.success(function(data, status, headers, config) {
	  		// populate response object
			var x2js = new X2JS()
			var json = x2js.xml_str2json(data)
	  		var response = json.interaction.actions.action
	 		// populate messages
	 		if (successCallback) {
	 			successCallback(response)
	 		}
		})
		.error(function(data, status, headers, config) {
			// populate error messages
			if (errorCallback) {
				errorCallback('foo')
			}
		})
	}
}])
