module.exports = function(config){
	config.set({

	basePath : './',

	files : [
	'WebContent/bower_components/angular/angular.js',
	'WebContent/bower_components/angular-route/angular-route.js',
	'WebContent/bower_components/angular-mocks/angular-mocks.js',
	'WebContent/bower_components/angular-bootstrap/ui-bootstrap*.min.js',
	'WebContent/x2js/*.js',
	'WebContent/home/*.js',
	'WebContent/settings/*.js',
	'WebContent/items/*.js',
	'WebContent/dialogs/*.js',
	'WebContent/approvalsmanager/*.js',
	'WebContent/ria/*.js',
	],

	autoWatch : true,

	frameworks: ['jasmine'],

	browsers : ['Chrome'],
	//browsers : ['Chrome', 'Safari'],

	plugins : [
	'karma-chrome-launcher',
	'karma-safari-launcher',
	'karma-firefox-launcher',
	'karma-jasmine',
	'karma-junit-reporter'
	],

	junitReporter : {
		outputFile: 'test_out/unit.xml',
		suite: 'unit'
	}

	});
};
