'use strict';

angular.module('approvalsManager.dialogs', [ 'ui.bootstrap' ])
.controller('progressDialogController', ['$scope', '$timeout', '$modalInstance', 'getProgress',
	function(
		$scope, 
		$timeout, 
		$modalInstance,
		getProgress // function, returns value out of 100 for progress bar
		) {

	$scope.progress = 0
	$scope.getProgress = function() {
		$scope.progress = getProgress()
		return $scope.progress
	}
	$scope.$watch('progress', function(progress) {
		if (progress >= 100) {
			$timeout($modalInstance.close, 250)
		}
	})
	$scope.ok = function() {
		$modalInstance.close()
	}
}])
.factory('showProgress', [ '$modal', function($modal) {
	// set up progress dialog
	return function(
		getProgressFunction // function, returns value out of 100 for progress bar
	) {
		var modalInstance = $modal.open({
			templateUrl: 'dialogs/progressDialog.html',
			controller: 'progressDialogController',
			size: 'sm',
			resolve: {
				getProgress: function() {
					return getProgressFunction
				}
			}
		});
		modalInstance.result.then(
			function() {
				// clean up?
			}
		)
	}
}])
