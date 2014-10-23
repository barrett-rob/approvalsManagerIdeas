'use strict';

describe('approvalsManager.home module', function() {

	beforeEach(module('approvalsManager.home'));

	describe('home controller', function(){

		it('should ....', inject(function($controller, $rootScope) {
			var scope = $rootScope.$new()
			var ctrlr = $controller('homeController', { $scope: scope })
			expect(ctrlr).toBeDefined()
			// check that there is an alerts object
			expect(scope.alerts).toBeDefined()
		}))

  })
})