'use strict'

angular.module('ApprovalsManagerService', [ 'RIAHttpService' ])
.config(function() {
	// TODO: get this from local storage
	self.filters = { employeeId: 'NINES' }
})
.factory('getFilters', [ function() {
	return function() {
		return self.filters
	}
}])
.factory('setFilters', [ function() {
	return function(filters) {		
		self.filters = filters
	}
}])
.factory('getApprovalCounts', [ 'executeService', function(executeService) {
	return function() {
	}
}])
