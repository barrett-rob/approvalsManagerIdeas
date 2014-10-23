'use strict';

angular.module('approvalsManager.home', ['ngRoute', 'RIAHttpService'])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'homeController'
	})
}])
.controller('homeController', ['$scope', '$timeout', 'executeLogin', function($scope, $timeout, executeLogin) {

	// init
	$scope.alerts = [ { type: 'info', msg: "Connecting to Ellipse..." } ]
	$scope.counts = undefined

	self.getApprovalCounts = function() {
		$scope.counts = [
			{ 'itemType': 'foo', 'itemTypeDescription': 'Foo foo foo', 'itemTypeCount': 1 },
			{ 'itemType': 'bar', 'itemTypeDescription': 'Bar bar bar', 'itemTypeCount': 2 }
		]
		$scope.alerts.push({ type: 'success', msg: "Retrieved approval items." })
	}
	self.login = function() {
		executeLogin(function(response) {
			// login success
			$scope.alerts.push({ type: 'success', msg: "Connected" })
			$scope.alerts.push({ type: 'info', msg: "Checking for approval items..." })
			$timeout(self.getApprovalCounts, 500);
		}, function(response) {
			// login failure
			$scope.alerts.push({ type: 'danger', msg: "Connection failed, please check settings" })
		})
	}
	$timeout(self.login, 1000);
}])