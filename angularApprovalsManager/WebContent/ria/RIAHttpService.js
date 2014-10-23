'use strict'

/* This is a stateful service, executeLogin() must 
 * succeed before you can use executeService.
 */
angular.module('RIAHttpService', [ 'RIAURLService', 'RIACredentialsService' ])
.config(function() {

	// init state
	self.connectionId = undefined
	self.x2js = new X2JS()

	// utility methods
	self.createInteraction = function(
		application, // string
		actions // array of action (see self.createAction)
		) {
		// set up interaction object
		var interaction = { 'actions': actions }
		if (angular.isDefined(self.connectionId)) {
			interaction.connectionId = self.connectionId
		}
		interaction.application = application
		interaction.applicationPage = undefined // is applicationPage important?
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
	self.createServiceAction = function(
		service, // string
		operation, // string
		returnWarnings, // boolean
		requiredAttributes, // object
		restart, // object
		maxInstances, // int
		dto // object
		) {
		var serviceaction = self.createAction('service', { 
			'name': service, 
			'operation': operation, 
			'returnWarnings': returnWarnings,
			'dto': dto,
			'requiredAttributes': requiredAttributes,
			'restart': restart,
			'maxInstances': maxInstances,
			}
		)
		return serviceaction
	}
	self.getBindUrl = function(url) {
		return url + '/bind'
	}
	self.createErrorResponse = function(text) {
		var response = { 'messages': { 'errors': { 'message': { 'text': text } } } }
		return response
	}
	self.executePost = function(http, url, interaction, successFunction, errorFunction) {
		var xml = x2js.json2xml_str(interaction)
		http.post(url, xml, {'headers': {'Content-Type':'application/xml'} })
		.success(function(data, status, headers, config) {
			if (successFunction) {
				successFunction(data, status, headers, config)
			}
		})
		.error(function(data, status, headers, config) {
			if (errorFunction) {
				errorFunction(data, status, headers, config)
			}
		})
	}
})
.factory('executeService', [ '$http', 'getUrl', function($http, getUrl) {
	return function(
		service, // string
		operation, // string
		returnWarnings, // boolean
		requiredAttributes, // object
		restart, // object
		maxInstances, // int
		dto, // object
		successCallback, // function(response)
		failureCallback // function(response)
		) {
		// executes a service call, calls the 1st callback if
		// the invocation succeeded, or the 2nd if it failed

		// first check for connectionId
		if (!angular.isDefined(self.connectionId)) {
			if (failureCallback) {
				failureCallback(createErrorResponse('you must log in using executeLogin() before using executeService()'))
			}
			return
		}
		var serviceaction = self.createServiceAction(
			service, 
			operation, 
			returnWarnings,
			requiredAttributes,
			restart,
			maxInstances,
			dto
			)
		var interaction = self.createInteraction('RIAHttpService.executeService', [ serviceaction ])
		var url = self.getBindUrl(getUrl())
		self.executePost($http, url, interaction, function(data, status, headers, config) {
			// success
		}, function(data, status, headers, config) {
			// error
		})
	}
}])
.factory('executeLogin', [ '$http', 'getCredentials', 'getUrl', function($http, getCredentials, getUrl) {
	return function(
		successCallback, // function(response)
		failureCallback // function(response)
		) {
		// executes a login, calls the 1st callback if
		// the login succeeded, or the 2nd if it failed
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
		var url = self.getBindUrl(getUrl())
		self.executePost($http, url, interaction, function(data, status, headers, config) {
			// success
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
				if (angular.isDefined(response.data.connectionId)) {
					if (angular.isDefined(self.connectionId)) {
						console.warn('logging in when there is already a connectionId defined')
						console.warn('connectionId [' + self.connectionId + '] will be discarded')
					}
					self.connectionId = response.data.connectionId
				}
		 		if (successCallback) {
		 			successCallback(response)
		 		}
			}
		}, function(data, status, headers, config) {
			// error
			// comms failure? - populate error messages
			if (failureCallback) {
				failureCallback(createErrorResponse('login failed: http status code' + status))
			}
		})
	}
}])
.factory('poke', [ '$http', function($http) {
	return function(url, pokeCallback) {
		// perform a GET of the supplied url, calls
		// the supplied function with a boolean that
		// indicates whether the GET was successful.
		// (redirections are considered a successful poke)
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
