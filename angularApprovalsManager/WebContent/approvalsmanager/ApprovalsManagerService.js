'use strict'

angular.module('ApprovalsManagerService', [ 'RIAHttpService' ])
.config(function() {
	// TODO: get this from local storage
	self.filters = { retrieveUnauthorisedTransactions: 'Y', employeeId: 'NINES' }
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
.factory('getItemTypeCounts', [ 'executeService', function(executeService) {
	return function(
		whenComplete // function(itemTypeCounts)
		) {
		var dto = angular.copy(self.filters)
		executeService(
			'com.mincom.ellipse.service.m3875.approvalsmanager.ApprovalsManagerService',
			'retrieveApprovals',
			true, // return warnings
			undefined, // required attributes
			undefined, // restart
			100, // max instances
			dto, // dto
			function(response) {
				var itemTypeCounts = {}
				if (angular.isDefined(response.data.result.dto)) {
					if (angular.isArray(response.data.result.dto)) {
						var dtos = response.data.result.dto
						for (var i in dtos) {
							var dto = dtos[i]
							var itemType = dto.tran877Type
							var o = itemTypeCounts[itemType]
							if (o) {
								o.count = o.count + 1
							} else {
								itemTypeCounts[itemType] = { 'itemType': itemType, 'count': 1 }
							}
						}
					}
				}
				if (whenComplete) {
					whenComplete(itemTypeCounts)
				}
			}
		)
	}
}])
