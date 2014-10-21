'use strict';

angular.module('approvalsManager.home', ['ngRoute', 'HttpService'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'homeController'
	});
}])
.controller('homeController', [function() {
}]);