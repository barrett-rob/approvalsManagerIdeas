'use strict';

angular.module('approvalsManager.settings', [ 'ngRoute', 'RIASettingsService', 'RIAHttpService' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/settings', {
		templateUrl: 'settings/settings.html',
		controller: 'settingsController'
	});
}])
.controller('settingsController', [ '$scope', 'poke', 'getSettings', 'setSettings', function($scope, poke, getSettings, setSettings) {
	var settings = getSettings()
	// TODO: get credentials from local storage
	$scope.url = settings.url
	$scope.username = settings.username
	$scope.password = settings.password
	$scope.position = settings.position
	$scope.district = settings.district
	$scope.employeeId = settings.employeeId
	$scope.validate = function() {
		console.log('validate')
		// validate url
		var url = $scope.url
		var pokeCallback = function(success) {
			if (success) {
				console.log('url is valid: ' + url + ', checking login')
				$scope.settingsForm.url.$valid = true
			} else {
				console.log('url is NOT valid: ' + url)
				$scope.settingsForm.url.$invalid = true
			}
		}
		poke(url, pokeCallback)
	}
}])