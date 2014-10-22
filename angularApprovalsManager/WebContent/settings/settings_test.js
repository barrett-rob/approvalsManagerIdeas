'use strict';

describe('approvalsManager.settings module', function() {

	beforeEach(module('approvalsManager.settings'));

	describe('settings controller', function(){

		it('should ....', inject(function($controller, $rootScope) {
			var scope = $rootScope.$new()
			var ctrlr = $controller('settingsController', { $scope: scope })
			expect(ctrlr).toBeDefined()
			expect(scope.settings.url).toBeDefined()
			expect(scope.settings.username).toBeDefined()
			expect(scope.settings.password).toBeDefined()
			expect(scope.settings.district).toBeDefined()
			expect(scope.settings.position).toBeDefined()
			expect(scope.settings.employeeId).toBeDefined()
			// check that the validate method is present
			expect(scope.validate).toBeDefined()
		}))

	})
})