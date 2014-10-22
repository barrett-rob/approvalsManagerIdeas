'use strict'

// ria http service

angular.module('RIAHttpService', [ 'RIAURLService', 'RIACredentialsService' ])
.config(function() {
	self.createInteraction = function(
		application, // string
		actions // array of action (see self.createAction)
		) {
		// set up interaction object
		var interaction = { 
			'actions': actions, 
			'application': application, 
			'applicationPage': undefined
		}
		return { 'interaction': interaction }
	}
	self.createAction = function(
		name, // string
		data // object
		) {
		var action = { 
			'name': name,
			'data': data
		}
		return { 'action': action }
	}
})
.factory('login', [ '$http', 'getCredentials', 'getUrl', function($http, getCredentials, getUrl) {
	return function(successCallback, errorCallback) {
		var credentials = getCredentials()
		// construct interaction object
		var data = {
			'username': credentials.username,
			'password': credentials.password,
			'scope': credentials.district,
			'position': credentials.position,
			'rememberMe': 'N',
		}
		var action = self.createAction('login', data)
		var interaction = self.createInteraction('login', [ action ])
		var x2js = new X2JS()
		var xml = x2js.json2xml_str(interaction)
		// execute post
		var url = getUrl()
		$http.post(url, xml)
		.success(function(data, status, headers, config) {
	  		// populate response object
			var json = x2js.xml_str2json(data)
	  		var response = json.interaction.actions.action
			// initialise messages
			var messages = response.messages
			if (!messages || messages == '') {
				response.messages = {}
			}
	 		if (successCallback) {
	 			successCallback(response)
	 		}
		})
		.error(function(data, status, headers, config) {
			// populate error messages
			if (errorCallback) {
				errorCallback(status)
			}
		})
	}
}])
.factory('poke', [ '$http', function($http) {
	return function(url, pokeCallback) {
		// perform GET
		$http.get(url)
		.success(function(data, status, headers, config) {
	 		if (pokeCallback) {
	 			pokeCallback(true)
	 		}
		})
		.error(function(data, status, headers, config) {
			var success = false
			if (status >= 300 && status < 400) {
				// these are ok too as far as a poke is concerned
				success = true
			}
			if (pokeCallback) {
				pokeCallback(success)
			}
		})
	}
}])
