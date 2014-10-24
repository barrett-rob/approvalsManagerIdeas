'use strict';

angular.module('approvalsManager.home', [ 'ngRoute', 'RIAHttpService', 'ApprovalsManagerService' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'homeController'
	})
}])
.controller('homeController', ['$scope', '$timeout', 'executeLogin', 'getItemTypeCounts', function($scope, $timeout, executeLogin, getItemTypeCounts) {

	// init
	$scope.alerts = [ { type: 'info', msg: "Connecting to Ellipse..." } ]
	$scope.itemTypeCounts = undefined

	self.getApprovalCounts = function() {
		getItemTypeCounts(function(itemTypeCounts) {
			$scope.itemTypeCounts = itemTypeCounts
			$scope.alerts.push({ type: 'success', msg: "Retrieved approval items." })
		})
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