'use strict';

angular.module('approvalsManager.home', [ 'ngRoute', 'RIAHttpService', 'ApprovalsManagerService' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'homeController'
	})
}])
.controller('homeController', ['$scope', '$timeout', 'executeLogin', 'getItemTypeCounts', 'hasConnectionId',
	function($scope, $timeout, executeLogin, getItemTypeCounts, hasConnectionId) {

	// init
	$scope.alerts = []
	$scope.itemTypeCounts = undefined
	$scope.refresh = function() {
		self.refresh()
	}
	self.refresh = function() {
		self.login()
	}
	self.getApprovalCounts = function() {
		getItemTypeCounts(function(itemTypeCounts) {
			$scope.alerts.push({ type: 'success', msg: "Retrieved approval items." })
			for (var key in itemTypeCounts) {
				// something in itemTypeCounts
				$scope.itemTypeCounts = itemTypeCounts
				self.itemTypeCounts = itemTypeCounts
				$timeout(function() {
					// clear error messages
					$scope.alerts = []
				}, 1000)
				return
			}
			// nothing in itemTypeCounts
			$scope.itemTypeCounts = undefined
		})
	}
	self.login = function() {
		$scope.alerts.push({ type: 'info', msg: "Connecting to Ellipse..." })
		var doGetApprovalCounts = function(response) {
			// login success
			$scope.alerts.push({ type: 'success', msg: "Connected" })
			$scope.alerts.push({ type: 'info', msg: "Checking for approval items..." })
			$timeout(self.getApprovalCounts, 250);
		}
		if (hasConnectionId()) {
			doGetApprovalCounts()
		} else {
			executeLogin(
				doGetApprovalCounts, 
				function(response) {
					$scope.alerts.push({ type: 'danger', msg: "Connection failed, please check settings" })
				}
			)
		}
	}
	if (!angular.isDefined($scope.itemTypeCounts)) {
		$timeout(self.refresh, 250);
	}
}])