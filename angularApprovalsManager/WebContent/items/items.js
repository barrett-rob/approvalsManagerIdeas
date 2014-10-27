'use strict';

angular.module('approvalsManager.items', [ 'ngRoute', 'ApprovalsManagerService' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/items', {
		templateUrl: 'items/items.html',
		controller: 'itemsController'
	});
}])
.controller('itemsController', 
	[ '$scope', '$routeParams', '$timeout', 'getItems',
	function($scope, $routeParams, $timeout, getItems) {
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
		getItems($scope.itemType,
			function(items) {
				$scope.items = items
			}
		)
	}
	$timeout(self.getItems, 250);
}])