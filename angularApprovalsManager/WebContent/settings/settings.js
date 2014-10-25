'use strict';

angular.module('approvalsManager.settings', [ 'ngRoute', 'RIAURLService', 'RIACredentialsService', 'RIAHttpService', 'ApprovalsManagerService' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/settings', {
		templateUrl: 'settings/settings.html',
		controller: 'settingsController'
	});
}])
.controller('settingsController', 
	[ '$scope', 'poke', 'getCredentials', 'setCredentials', 'getUrl', 'setUrl', 'getFilters', 'setFilters', 'executeLogin', '$timeout', 
	function($scope, poke, getCredentials, setCredentials, getUrl, setUrl, getFilters, setFilters, executeLogin, $timeout) {
	// set up alerts
	$scope.alerts = [ { type: 'info', msg: "Don't forget to validate your settings." } ]
	// set up credentials
	var oldcredentials = getCredentials()
	$scope.credentials = oldcredentials
	// set up url
	var oldurl = getUrl()
	$scope.url = oldurl
	// set up filters
	$scope.filters = getFilters()
	$scope.validate = function() {
		console.log('validate')
		// validate url
		var url = $scope.url
		poke(url, function(success) {
			if (success) {
				console.log('url is valid, checking credentials by logging in')
				$scope.alerts = [ { type: 'success', msg: 'Ellipse URL is valid.' } ]
				// validate credentials
				var newcredentials = {}
				angular.copy($scope.credentials, newcredentials)
				setCredentials(newcredentials)
				executeLogin(
					function(response) {
						// success
						console.log('credentials are valid')
						$scope.alerts.push( { type: 'success', msg: 'Login succeeded, these settings have been saved.' } )
						// validate filters?
						setFilters($scope.filters)
						$timeout(function() {
							// clear messages after a bit
							$scope.alerts = []
						}, 1000)
					}, 
					function(response) {
						console.log('credentials are NOT valid')
						var message = response.messages.errors.message
						$scope.alerts.push( { type: 'danger', msg: message.text } )
						$scope.alerts.push( { type: 'danger', msg: 'Login failed, these settings have not been saved.' } )
						setCredentials(oldcredentials)
					}
				)
				setUrl(url)
			} else {
				console.log('url is NOT valid: ' + url)
				$scope.alerts = [ { type: 'danger', msg: 'Ellipse URL is not valid, these settings have not been saved.' } ]
				setUrl(oldurl)
			}
		})
	}
}])