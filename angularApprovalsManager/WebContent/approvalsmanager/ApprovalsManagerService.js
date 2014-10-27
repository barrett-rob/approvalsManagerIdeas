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
							var itemDescription = DESCRIPTIONS[itemType]
							var o = itemTypeCounts[itemType]
							if (o) {
								o.count = o.count + 1
							} else {
								itemTypeCounts[itemType] = { 'itemType': itemType, 'itemDescription': itemDescription, 'count': 1 }
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

// this is a temporary hack until we get
// a service to deliver these descriptions
var DESCRIPTIONS = {
	'AI': 'Auto Invoice Item', 
	'CO': 'Contract', 
	'CI': 'Contract Invoice Item', 
	'CR': 'Contract Overrun', 
	'VA': 'Contract Valuations', 
	'CV': 'Contract Variant', 
	'CD': 'Credit/Debit Note', 
	'FI': 'FMS Indent', 
	'IF': 'Field Release Invoice Item', 
	'GA': 'GPA Agreements', 
	'GR': 'GPA Request for Quotes', 
	'GI': 'Goods Invoice Item', 
	'IP': 'Indent History', 
	'IN': 'Invoice', 
	'IR': 'Issue Requisition', 
	'MI': 'Mixed Invoice Item', 
	'NI': 'Non-order Invoice Item', 
	'OI': 'Other Invoice Item', 
	'PW': 'Parent Work Order', 
	'PO': 'Purchase Order', 
	'PR': 'Purchase Requisition', 
	'RP': 'Recurring Payment', 
	'FP': 'Request For Quote', 
	'RI': 'Retention Invoice Item', 
	'SI': 'Service Order Invoice Item', 
	'SC': 'Supply Customer Transfer', 
	'WO': 'Work Order', 
}
