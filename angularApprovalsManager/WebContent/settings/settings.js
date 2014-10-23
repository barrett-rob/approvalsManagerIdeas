'use strict';

angular.module('approvalsManager.settings', [ 'ngRoute', 'RIAURLService', 'RIACredentialsService', 'RIAHttpService' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/settings', {
		templateUrl: 'settings/settings.html',
		controller: 'settingsController'
	});
}])
.controller('settingsController', [ '$scope', 'poke', 'getCredentials', 'setCredentials', 'getUrl', 'setUrl', 'login', function($scope, poke, getCredentials, setCredentials, getUrl, setUrl, login) {
	var oldcredentials = getCredentials()
	$scope.credentials = oldcredentials
	var oldurl = getUrl()
	$scope.url = oldurl
	// TODO: implement filters service
	$scope.filters = []
	$scope.filters.employeeId = ''
	// set up alerts
	$scope.alerts = [ { type: 'success', msg: "Don't forget validate your settings." } ]
	$scope.validate = function() {
		console.log('validate')
		// validate url
		var url = $scope.url
		var pokeCallback = function(success) {
			if (success) {
				console.log('url is valid: ' + url + ', checking login')
				$scope.alerts = [ { type: 'success', msg: 'Ellipse URL is valid.' } ]
				// validate credentials
				var newcredentials = {}
				angular.copy($scope.credentials, newcredentials)
				setCredentials(newcredentials)
				login(
					function(response) {
						// var connectionId = response.data.connectionId
						if (angular.isDefined(response.messages.errors)) {
							$scope.alerts.push( { type: 'danger', msg: 'Login failed, these settings will not be kept.' } )
							var message = response.messages.errors.message
							$scope.alerts.push( { type: 'danger', msg: message.text } )
						} else {
							// success
							$scope.alerts.push( { type: 'success', msg: 'Login succeeded, these settings will be kept.' } )
						}
					}, 
					function(status) {
						$scope.alerts.push( { type: 'danger', msg: 'Login failed, these settings will not be kept.' } )
						// old settings remain
						setSettings(settings)
					}
				)
			} else {
				console.log('url is NOT valid: ' + url)
				$scope.alerts = [ { type: 'danger', msg: 'Ellipse URL is not valid.' } ]
			}
		}
		poke(url, pokeCallback)
	}
}])