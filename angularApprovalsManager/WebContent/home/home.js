'use strict';

angular.module('approvalsManager.home', [ 'ngRoute', 'RIAHttpService', 'ApprovalsManagerService', 'ui.bootstrap' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'homeController'
	})
}])
.controller('homeController', [
	'$scope', 
	'$timeout', 
	'executeLogin', 
	'getItemTypeCounts', 
	'hasConnectionId', 
	'showProgress',
	function(
		$scope, 
		$timeout, 
		executeLogin, 
		getItemTypeCounts, 
		hasConnectionId, 
		showProgress
	) {
	// init
	$scope.alerts = []
	$scope.itemTypeCounts = undefined
	$scope.progress = 0
	$scope.getProgress = function() {
		return $scope.progress
	}
	$scope.refresh = function() {
		self.refresh()
	}
	self.refresh = function() {
		$scope.progress = 5
		showProgress($scope.getProgress)
		self.login()
	}
	self.getApprovalCounts = function() {
		getItemTypeCounts(function(itemTypeCounts) {
			for (var key in itemTypeCounts) {
				// something in itemTypeCounts
				$scope.itemTypeCounts = itemTypeCounts
				$timeout(function() {
					// clear messages after a bit
					$scope.alerts = []
				}, 1000)
				$scope.progress = 100
				return
			}
			// nothing in itemTypeCounts
			$scope.itemTypeCounts = undefined
			$scope.progress = 100
		})
	}
	self.login = function() {
		var doGetApprovalCounts = function(response) {
			$scope.progress = 50
			$timeout(self.getApprovalCounts, 250);
		}
		if (hasConnectionId()) {
			doGetApprovalCounts()
		} else {
			executeLogin(
				doGetApprovalCounts, 
				function(response) {
					$scope.progress = 100
					$scope.alerts.push({ type: 'danger', msg: "Connection failed, please check settings" })
				}
			)
		}
	}
	if (!angular.isDefined($scope.itemTypeCounts)) {
		$timeout(self.refresh, 250);
	}
}])
