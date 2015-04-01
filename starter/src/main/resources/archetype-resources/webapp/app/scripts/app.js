#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

/**
 * @ngdoc overview
 * @name yamaApp
 * @description
 * # yamaApp
 *
 * Main module of the application.
 */
angular.module('${artifactId}App', [
	'yama-config',
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngRoute',
	'ngSanitize',
	'ngTouch',
	'ui.bootstrap',
	'ui.select',
	'oauth',
	'angular-loading-bar',
	'jcs-autoValidate',
	'restangular',
	'angularPopupBoxes',
	'angularFileUpload'
]).config(function (${symbol_dollar}routeProvider, ${symbol_dollar}locationProvider) {
	${symbol_dollar}locationProvider.html5Mode(false).hashPrefix('!');
	${symbol_dollar}routeProvider
	.when('/', {
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	})
	.when('/about', {
		templateUrl: 'views/about.html',
		controller: 'AboutCtrl'
	})
	.when('/admin/roles', {
		templateUrl: 'views/role.html',
		controller: 'RoleCtrl'
	})
	.when('/admin/users', {
		templateUrl: 'views/user.html',
		controller: 'UserCtrl'
	})
	.when('/applications', {
		templateUrl: 'views/application.html',
		controller: 'ApplicationCtrl'
	})
	.when('/my/profile', {
		templateUrl: 'views/myprofile.html',
		controller: 'MyProfileCtrl'
	})
	.otherwise({
		redirectTo: '/'
	});
}).config(function(${symbol_dollar}httpProvider, RestangularProvider, uiSelectConfig) {
	// Http and Restangular
	${symbol_dollar}httpProvider.interceptors.push('Oauth2RequestInterceptor');

	RestangularProvider.setBaseUrl('/api');
	RestangularProvider.setDefaultHttpFields({cache: true});

	RestangularProvider.addResponseInterceptor(function(data, operation) {
		var extractedData;

		if (operation === 'getList' && angular.isObject(data)) {
			extractedData = angular.copy(data.content, extractedData);
			delete data.content;
			extractedData.meta = data;
		} else {
			extractedData = data;
		}

		return extractedData;
	});

	// UI-Select
	uiSelectConfig.theme = 'bootstrap';
	uiSelectConfig.resetSearchInput = true;
}).run(function (bootstrap3ElementModifier) {
	bootstrap3ElementModifier.enableValidationStateIcons(false);
}).run(function(${symbol_dollar}rootScope, ${symbol_dollar}http, AccessToken, Endpoint, Users, ProfilePictures, oauthConfig) {
	Endpoint.set(oauthConfig);
	AccessToken.set(oauthConfig);

	${symbol_dollar}rootScope.$on('oauth:loggedOut', function() {
		Endpoint.redirect();
	});


	if (AccessToken.get()) {
		Users.one('me').get().then(function(user) {
			${symbol_dollar}rootScope.currentUser = user;
		});

		ProfilePictures.reloadPhoto();
	}

	${symbol_dollar}rootScope.logout = function() {
		${symbol_dollar}http.get('/logout').success(function() {
			AccessToken.destroy();

			setTimeout(function() {
				${symbol_dollar}rootScope.$broadcast('oauth:logout');
				${symbol_dollar}rootScope.$broadcast('oauth:loggedOut');
			}, 500);
		});
	};
});
