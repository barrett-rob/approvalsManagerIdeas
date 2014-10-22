'use strict';

// Declare app level module which depends on views, and components
angular.module('approvalsManager', [
	'ngRoute',
	'approvalsManager.home',
	'approvalsManager.settings',
	'ui.bootstrap',
	]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.otherwise({redirectTo: 'home'});
}]);
