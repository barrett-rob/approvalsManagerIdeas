'use strict';

angular.module('approvalsManager.settings', [ 'ngRoute', 'RIASettingsService', 'RIAHttpService' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/settings', {
		templateUrl: 'settings/settings.html',
		controller: 'settingsController'
	});
}])
.controller('settingsController', [ '$scope', 'poke', 'getSettings', 'setSettings', 'login', function($scope, poke, getSettings, setSettings, login) {
	var settings = getSettings()
	// TODO: get credentials from local storage
	$scope.url = settings.url
	$scope.username = settings.username
	$scope.password = settings.password
	$scope.position = settings.position
	$scope.district = settings.district
	$scope.employeeId = settings.employeeId
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
			} else {
				console.log('url is NOT valid: ' + url)
				$scope.settingsForm.url.$invalid = true
				$scope.alerts = [ { type: 'danger', msg: 'Ellipse URL is not valid.' } ]
			}
		}
		poke(url, pokeCallback)
	}
}])