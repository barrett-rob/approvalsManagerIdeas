'use strict';

angular.module('approvalsManager.settings', [ 'ngRoute', 'RIAURLService', 'RIACredentialsService', 'RIAHttpService' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/settings', {
		templateUrl: 'settings/settings.html',
		controller: 'settingsController'
	});
}])
.controller('settingsController', [ '$scope', 'poke', 'getCredentials', 'setCredentials', 'getUrl', 'setUrl', 'login', function($scope, poke, getCredentials, setCredentials, getUrl, setUrl, login) {
	// set up alerts
	$scope.alerts = [ { type: 'info', msg: "Don't forget to validate your settings." } ]
	// set up url and credentials
	var oldcredentials = getCredentials()
	$scope.credentials = oldcredentials
	var oldurl = getUrl()
	$scope.url = oldurl
	// TODO: implement filters service
	$scope.filters = []
	$scope.filters.employeeId = ''
	$scope.validate = function() {
		console.log('validate')
		// validate url
		var url = $scope.url
		poke(url, function(success) {
			if (success) {
				console.log('url is valid: ' + url + ', checking login')
				$scope.alerts = [ { type: 'success', msg: 'Ellipse URL is valid.' } ]
				// validate credentials
				var newcredentials = {}
				angular.copy($scope.credentials, newcredentials)
				setCredentials(newcredentials)
				login(
					function(response) {
						// success
						$scope.alerts.push( { type: 'success', msg: 'Login succeeded, these settings will be retained.' } )
					}, 
					function(status) {
						$scope.alerts.push( { type: 'danger', msg: 'Login failed, these settings will not be retained.' } )
						var message = response.messages.errors.message
						$scope.alerts.push( { type: 'danger', msg: message.text } )
						setCredentials(oldcredentials)
					}
				)
				setUrl(url)
			} else {
				console.log('url is NOT valid: ' + url)
				$scope.alerts = [ { type: 'danger', msg: 'Ellipse URL is not valid.' } ]
				setUrl(oldurl)
			}
		})
	}
}])