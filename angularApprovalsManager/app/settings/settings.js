'use strict';

angular.module('approvalsManager.settings', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/settings', {
		templateUrl: 'settings/settings.html',
		controller: 'SettingsController'
	});
}])
.controller('SettingsController', [function() {

}]);