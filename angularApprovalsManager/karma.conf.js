module.exports = function(config){
	config.set({

	basePath : './',

	files : [
	'app/bower_components/angular/angular.js',
	'app/bower_components/angular-route/angular-route.js',
	'app/bower_components/angular-mocks/angular-mocks.js',
	'app/x2js/*.js',
	'app/home/*.js',
	'app/settings/*.js',
	'app/ria/*.js',
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
