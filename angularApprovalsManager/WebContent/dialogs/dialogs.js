'use strict';

angular.module('approvalsManager.dialogs', [ 'ui.bootstrap' ])
.controller('progressDialogController', ['$scope', '$timeout', '$modalInstance', 
	function($scope, $timeout, $modalInstance) {

	$scope.ok = function() {
		$modalInstance.close()
	}
	$scope.cancel = function() {
		$modalInstance.dismiss()
	}
}])
