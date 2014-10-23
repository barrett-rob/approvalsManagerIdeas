'use strict';

describe('approvalsManager.settings module', function() {

	beforeEach(module('approvalsManager.settings'));

	describe('settings controller', function(){

		it('should ....', inject(function($controller, $rootScope) {
			var scope = $rootScope.$new()
			var ctrlr = $controller('settingsController', { $scope: scope })
			expect(ctrlr).toBeDefined()
			expect(scope.url).toBeDefined()
			expect(scope.credentials.username).toBeDefined()
			expect(scope.credentials.password).toBeDefined()
			expect(scope.credentials.scope).toBeDefined()
			expect(scope.credentials.position).toBeDefined()
			expect(scope.filters.employeeId).toBeDefined()
			// check that the validate method is present
			expect(scope.validate).toBeDefined()
			// check that there is an alerts object
			expect(scope.alerts).toBeDefined()
		}))

	})
})