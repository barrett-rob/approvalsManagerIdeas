'use strict';

angular.module('approvalsManager.settings', [ 'ngRoute', 'URLService', 'HttpService' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/settings', {
		templateUrl: 'settings/settings.html',
		controller: 'settingsController'
	});
}])
.controller('settingsController', [ '$scope', 'setUrl', function($scope, setUrl) {
	// TODO: get credentials from local storage
	$scope.url = 'http://ellipseonlineb0-el8dev-epsprd2-eps-prod.techops.ventyx.abb.com:8080/ria'
	$scope.username = 'AM2122'
	$scope.password = ''
	$scope.position = ''
	$scope.district = 'R100'
	$scope.employeeId = 'NINES'
	$scope.validate = function() {
		console.log('validate')
	}
}])