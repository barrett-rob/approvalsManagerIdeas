'use strict';

angular.module('approvalsManager.items', [ 'ngRoute', 'ApprovalsManagerService' ])
.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/items', {
		templateUrl: 'items/items.html',
		controller: 'itemsController'
	});
}])
.controller('itemsController', 
	[ '$scope', '$routeParams',
	function($scope, $routeParams) {
	// set up item type
	if (angular.isDefined($routeParams.itemType)) {
		$scope.itemType = $routeParams.itemType
	} else {
		$scope.alerts = [ { type: 'danger', msg: "Item type not specified." } ]
		return
	}
	// set up alerts
	$scope.alerts = [ { type: 'info', msg: "Retrieving items of type " + $scope.itemType } ]
	// retrieve items for item type
}])