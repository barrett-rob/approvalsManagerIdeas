'use strict';

angular.module('approvalsManager.home', [ 'ngRoute', 'RIAHttpService', 'ApprovalsManagerService', 'ui.bootstrap' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl: 'home/home.html',
		controller: 'homeController'
	})
}])
.controller('homeController', ['$scope', '$timeout', '$modal', 'executeLogin', 'getItemTypeCounts', 'hasConnectionId',
	function($scope, $timeout, $modal, executeLogin, getItemTypeCounts, hasConnectionId) {

	// init
	$scope.alerts = []
	$scope.itemTypeCounts = undefined
	$scope.progress = function() {
		var modalInstance = $modal.open({
			templateUrl: 'dialogs/progressDialog.html',
			controller: 'progressDialogController',
		});
		modalInstance.result.then(
			function() {
				// ok
			},
			function() {
				// cancel
			})
	}
	$scope.refresh = function() {
		self.refresh()
	}
	self.refresh = function() {
		self.login()
	}
	self.getApprovalCounts = function() {
		var alert = { type: 'info', msg: "Checking for approval items..." }
		$scope.alerts.push(alert)
		getItemTypeCounts(function(itemTypeCounts) {
			for (var key in itemTypeCounts) {
				// something in itemTypeCounts
				$scope.itemTypeCounts = itemTypeCounts
				alert.msg = alert.msg + ' done'
				$timeout(function() {
					// clear messages after a bit
					$scope.alerts = []
				}, 1000)
				return
			}
			// nothing in itemTypeCounts
			$scope.itemTypeCounts = undefined
		})
	}
	self.login = function() {
		var alert = { type: 'info', msg: "Connecting to Ellipse..." }
		$scope.alerts.push(alert)
		var doGetApprovalCounts = function(response) {
			// login success
			alert.msg = alert.msg + '  done'
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
