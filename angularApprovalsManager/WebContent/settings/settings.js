'use strict';

angular.module('approvalsManager.settings', [ 'ngRoute', 'RIASettingsService', 'RIAHttpService' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/settings', {
		templateUrl: 'settings/settings.html',
		controller: 'settingsController'
	});
}])
.controller('settingsController', [ '$scope', 'poke', 'getSettings', 'setSettings', 'login', function($scope, poke, getSettings, setSettings, login) {
	var oldsettings = getSettings()
	$scope.settings = oldsettings
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
				var newettings = {}
				angular.copy($scope.settings, newsettings)
				setSettings(newettings)
				login(
					function() {
						// if login worked
						// else 
					}, 
					function() {
						// old settings remain
						setSettings(settings)
					}
				)
			} else {
				console.log('url is NOT valid: ' + url)
				$scope.settingsForm.url.$invalid = true
				$scope.alerts = [ { type: 'danger', msg: 'Ellipse URL is not valid.' } ]
			}
		}
		poke(url, pokeCallback)
	}
}])