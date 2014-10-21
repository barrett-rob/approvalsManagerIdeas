'use strict';

describe('approvalsManager.settings module', function() {

	beforeEach(module('approvalsManager.settings'));

	describe('settings controller', function(){

		it('should ....', inject(function($controller, $rootScope) {
			var scope = $rootScope.$new()
			var ctrlr = $controller('settingsController', { $scope: scope })
			expect(ctrlr).toBeDefined()
			expect(scope.url).toBeDefined()
			expect(scope.username).toBeDefined()
			expect(scope.password).toBeDefined()
			expect(scope.district).toBeDefined()
			expect(scope.position).toBeDefined()
			expect(scope.employeeId).toBeDefined()
			// check that the validate method is present
			expect(scope.validate).toBeDefined()
		}))

	})
})