'use strict';

describe('ApprovalsManagerService tests', function() {

	beforeEach(module('ApprovalsManagerService'))

	describe('ApprovalsManagerService tests', function() {

		var scope, controller, httpBackend, getApprovalCounts

		beforeEach(inject(function(_$controller_, _$httpBackend_, $rootScope, _getApprovalCounts_) {
			scope = $rootScope.$new()
			controller = _$controller_
			httpBackend = _$httpBackend_
			getApprovalCounts = _getApprovalCounts_
		}))

		it('getApprovalCounts tests', function() {
			expect(scope).toBeDefined()
			expect(controller).toBeDefined()
			expect(httpBackend).toBeDefined()
			expect(getApprovalCounts).toBeDefined()
		})

	})
})
