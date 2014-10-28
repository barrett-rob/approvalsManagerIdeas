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
		console.log(progress)
		if (progress >= 100) {
			$modalInstance.close()
		}
	})
	$scope.ok = function() {
		$modalInstance.close()
	}
}])
