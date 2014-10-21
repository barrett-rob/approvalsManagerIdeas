'use strict';

// ria http session service unit tests


describe('riaHttpSession tests', function() {

	beforeEach(module('riaHttpSession'))

	describe('login tests', function() {

		var scope, controller, httpBackend, login

		beforeEach(inject(function(_$controller_, _$httpBackend_, $rootScope, _login_) {
			scope = $rootScope.$new()
			controller = _$controller_
			httpBackend = _$httpBackend_
			login = _login_
		}))

		it('login tests...', function() {
			expect(scope).toBeDefined()
			expect(controller).toBeDefined()
			expect(httpBackend).toBeDefined()
			expect(login).toBeDefined()
		})

	})
})