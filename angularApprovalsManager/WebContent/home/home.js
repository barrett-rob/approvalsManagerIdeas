'use strict';

angular.module('approvalsManager.home', ['ngRoute', 'RIAHttpService'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'homeController'
	});
}])
.controller('homeController', [function() {
}]);