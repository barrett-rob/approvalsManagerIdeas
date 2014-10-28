'use strict';

angular.module('approvalsManager.items', [ 
	'ngRoute',
	'ApprovalsManagerService',
	'ui.bootstrap' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/items', {
		templateUrl: 'items/items.html',
		controller: 'itemsController'
	});
}])
.controller('itemsController', 
	[ '$scope', '$routeParams', '$timeout', '$modal', 'getItems',
	function($scope, $routeParams, $timeout, $modal, getItems) {
	// set up progress dialog
	$scope.showProgress = function() {
		var modalInstance = $modal.open({
			templateUrl: 'dialogs/progressDialog.html',
			controller: 'progressDialogController',
			resolve: {
				getProgress: function() {
					return $scope.getProgress
				}
			}
		});
		modalInstance.result.then(
			function() {
				// ok
				$scope.progress = 0
			}
		)
	}
	$scope.progress = 0
	$scope.getProgress = function() {
		return $scope.progress
	}
	// set up item type
	if (angular.isDefined($routeParams.itemType)) {
		$scope.itemType = $routeParams.itemType
	} else {
		$scope.alerts = [ { type: 'danger', msg: "Item type not specified." } ]
		return
	}
	// set up alerts
	$scope.alerts = []
	// retrieve items for item type
	self.getItems = function() {
		$scope.progress = 5
		$scope.showProgress()
		getItems($scope.itemType,
			function(items) {
				$scope.items = items
				$scope.progress = 100
			}
		)
	}
	$timeout(self.getItems, 250);
}])