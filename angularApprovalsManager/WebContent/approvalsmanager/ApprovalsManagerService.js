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
				if (angular.isArray(response)) {
					throw 'expect only one response, got ' + response.length
				}
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
.factory('getItems', [ 'executeService', function(executeService) {
	return function (
		itemType, // string
		whenComplete // function(items)
		) {
		var dto = angular.copy(self.filters)
		dto.tran877Type = itemType
		executeService(
			'com.mincom.ellipse.service.m3875.approvalsmanager.ApprovalsManagerService',
			'retrieveApprovals',
			true, // return warnings
			undefined, // required attributes
			undefined, // restart
			100, // max instances
			dto, // dto
			function(response) {
				if (angular.isArray(response)) {
					throw 'expect only one response, got ' + response.length
				}
				var items = []
				if (angular.isDefined(response.data.result.dto)) {
					if (angular.isArray(response.data.result.dto)) {
						var dtos = response.data.result.dto
						for (var i in dtos) {
							var dto = dtos[i]
							items.push(dto)
						}
					}
				}
				if (whenComplete) {
					whenComplete(items)
				}
			}
		)
	}
}])
