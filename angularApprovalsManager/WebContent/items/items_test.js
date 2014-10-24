'use strict';

describe('approvalsManager.items module', function() {

	beforeEach(module('approvalsManager.items'));

	describe('items controller', function(){

		it('should ....', inject(function($controller, $rootScope) {
			var scope = $rootScope.$new()
			var ctrlr = $controller('itemsController', { $scope: scope })
			expect(ctrlr).toBeDefined()
			// check that there is an alerts object
			expect(scope.alerts).toBeDefined()
		}))

	})
})