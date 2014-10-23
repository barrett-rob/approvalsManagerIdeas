'use strict'

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
	self.getBindUrl = function(url) {
		return url + '/bind'
	}
	self.createErrorResponse = function(text) {
		var response = { 'messages': { 'errors': { 'message': { 'text': text } } } }
		return response
	}
})
.factory('executeService', [ '$http', 'getUrl', function($http, getUrl) {
	// executes a service call, calls the 1st callback 
	// if the login succeeded, or the 2nd if it failed
	return function(successCallback, failureCallback) {
		if (!angular.isDefined(self.connectionId)) {
			if (failureCallback) {
				failureCallback(createErrorResponse('you must log in using executeLogin() before using executeService()'))
			}
		}
	}
}])
.factory('executeLogin', [ '$http', 'getCredentials', 'getUrl', function($http, getCredentials, getUrl) {
	// executes a login, calls the 1st callback if
	// the login succeeded, or the 2nd if it failed
	return function(successCallback, failureCallback) {
		var credentials = getCredentials()
		// construct interaction object
		var data = {
			'username': credentials.username,
			'password': credentials.password,
			'scope': credentials.scope,
			'position': credentials.position,
			'rememberMe': 'N',
		}
		var action = self.createAction('login', data)
		var interaction = self.createInteraction('login', [ action ])
		var x2js = new X2JS()
		var xml = x2js.json2xml_str(interaction)
		// execute post
		var url = self.getBindUrl(getUrl())
		$http.post(url, xml, {'headers': {'Content-Type':'application/xml'} })
		.success(function(data, status, headers, config) {
	  		// populate response object
			var json = x2js.xml_str2json(data)
	  		var response = json.interaction.actions.action
			// initialise messages
			var messages = response.messages
			if (!messages || messages == '') {
				response.messages = {}
			}
			if (angular.isDefined(response.messages.errors)) {
				// login failed
				if (failureCallback) {
					failureCallback(response)
				}
			} else {
				// login success
		 		if (successCallback) {
		 			successCallback(response)
		 		}
			}
		})
		.error(function(data, status, headers, config) {
			// special case: populate error messages
			if (failureCallback) {
				failureCallback(createErrorResponse('login failed: http status code' + status))
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
