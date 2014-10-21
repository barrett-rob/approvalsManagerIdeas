'use strict';

// ria http session service unit tests


describe('riaHttpSession tests', function() {

	beforeEach(module('riaHttpSession'))

	describe('login tests', function() {

		it('login tests...', inject(function(_$controller_, _$httpBackend_, $rootScope, login) {
			var scope = $rootScope.$new()
			expect(scope).toBeDefined()
			var controller = _$controller_
			expect(controller).toBeDefined()
			var httpBackend = _$httpBackend_
			expect(httpBackend).toBeDefined()
			expect(login).toBeDefined()
		}))

	})
})