'use strict';

angular.module('approvalsManager.settings', [ 
	'ngRoute', 
	'RIAURLService', 
	'RIACredentialsService', 
	'RIAHttpService', 
	'ApprovalsManagerService',
	'ui.bootstrap' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/settings', {
		templateUrl: 'settings/settings.html',
		controller: 'settingsController'
	});
}])
.controller('settingsController', [ 
	'$scope', 
	'$timeout', 
	'poke', 
	'getCredentials', 
	'setCredentials', 
	'getUrl', 
	'setUrl', 
	'getFilters', 
	'setFilters', 
	'executeLogin', 
	'showProgress', 
	function(
		$scope, 
		$timeout, 
		poke, 
		getCredentials, 
		setCredentials, 
		getUrl, 
		setUrl, 
		getFilters, 
		setFilters, 
		executeLogin, 
		showProgress
	) {
	// init
	$scope.progress = 0
	$scope.getProgress = function() {
		return $scope.progress
	}
	// set up alerts
	$scope.alerts = []
	// set up credentials
	var oldcredentials = getCredentials()
	$scope.credentials = oldcredentials
	// set up url
	var oldurl = getUrl()
	$scope.url = oldurl
	// set up filters
	$scope.filters = getFilters()
	$scope.validate = function() {
		$scope.alerts = []
		$scope.progress = 5
		showProgress($scope.getProgress)
		$timeout(self.validateURL, 500);
	}
	self.validateURL = function() {
		var url = $scope.url
		poke(url, function(success) {
			if (success) {
				$timeout(self.validateCredentials, 500)
				setUrl(url)
				$scope.progress = 33
			} else {
				$scope.alerts = [ { type: 'danger', msg: 'Ellipse URL is not valid, these settings have not been saved.' } ]
				setUrl(oldurl)
				$scope.progress = 100
			}
		})
	}
	self.validateCredentials = function() {
		var newcredentials = {}
		angular.copy($scope.credentials, newcredentials)
		setCredentials(newcredentials)
		executeLogin(
			function(response) {
				// success
				$timeout(self.validateFilters, 500)
				$scope.progress = 66
			}, 
			function(response) {
				console.log('credentials are NOT valid')
				var message = response.messages.errors.message
				$scope.alerts.push( { type: 'danger', msg: message.text } )
				$scope.alerts.push( { type: 'danger', msg: 'Login failed, these settings have not been saved.' } )
				setCredentials(oldcredentials)
				$scope.progress = 100
			}
		)
	}
	self.validateFilters = function() {
		setFilters($scope.filters)
		$scope.progress = 100
	}
}])