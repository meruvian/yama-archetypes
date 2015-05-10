#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

/**
 * @ngdoc overview
 * @name ${artifactId}App
 * @description
 * # ${artifactId}App
 *
 * Main module of the application.
 */
angular.module('${artifactId}App', [
	'ngAnimate',
	'ngCookies',
	'ngSanitize',
	'ngTouch',
	'ui.bootstrap',
	'ui.select',
	'ui.router',
	'angular-oauth2',
	'angular-loading-bar',
	'restangular',
	'angularPopupBoxes',
	'angularFileUpload',
	'validation',
	'validation.rule',
	'validation.schema'
]).config(function (${symbol_dollar}locationProvider, $urlRouterProvider) {
	${symbol_dollar}locationProvider.html5Mode(false).hashPrefix('!');

	$urlRouterProvider.otherwise('/');
}).config(function(${symbol_dollar}httpProvider, RestangularProvider, uiSelectConfig) {
	RestangularProvider.setBaseUrl('/api');
	RestangularProvider.setDefaultHttpFields({cache: false});

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
}).config(function(OAuthProvider) {
	OAuthProvider.configure({
		baseUrl: location.protocol + '//' + location.host,
		clientId: 'yama',
		clientSecret: 'yamameruvianorgsecret',
		authorizePath: '/oauth/authorize',
		grantPath: '/oauth/token',
		revokePath: '/oauth/revoke'
	});
}).config(function(${symbol_dollar}validationProvider) {
	${symbol_dollar}validationProvider.showSuccessMessage = false;

	${symbol_dollar}validationProvider.invalidCallback = function(element) {
		${symbol_dollar}(element).parents('.form-group:first').addClass('has-error');
	};

	${symbol_dollar}validationProvider.validCallback = function(element) {
		${symbol_dollar}(element).parents('.form-group:first').removeClass('has-error');
	};

	${symbol_dollar}validationProvider.setExpression({
		match: function (value, scope, element, attrs, param) {
			return value === ${symbol_dollar}(param).val();
		}
	});

	${symbol_dollar}validationProvider.setErrorHTML(function (msg) {
		return '<p class=\"text-danger\">' + msg + '</p>';
	});

	${symbol_dollar}validationProvider.setSuccessHTML(function (msg) {
		return '<p class=\"text-success\">' + msg + '</p>';
	});
}).run(function(${symbol_dollar}rootScope, ${symbol_dollar}state, OAuth, OAuthToken, Users, ProfilePictures) {
	${symbol_dollar}rootScope.${symbol_dollar}state = {};

	${symbol_dollar}rootScope.$on('${symbol_dollar}stateChangeSuccess', function(event, toState, toParams) {
		${symbol_dollar}rootScope.${symbol_dollar}state.current = toState;
		${symbol_dollar}rootScope.${symbol_dollar}state.current.params = toParams;

		if (OAuth.isAuthenticated()) {
			if (!${symbol_dollar}rootScope.currentUser) {
				Users.one('me').get().then(function(user) {
					${symbol_dollar}rootScope.currentUser = user;

					ProfilePictures.reloadPhoto();
				});
			}
		}
	});

	${symbol_dollar}rootScope.$on('${symbol_dollar}stateChangeStart', function(event, toState, toParams) {
		if (!OAuth.isAuthenticated() && 'login' !== toState.name) {
			event.preventDefault();

			${symbol_dollar}rootScope.${symbol_dollar}state.toState = toState;
			${symbol_dollar}rootScope.${symbol_dollar}state.toState.params = toParams;

			${symbol_dollar}state.go('login');
		}
	});

	${symbol_dollar}rootScope.$on('oauth:error', function() {
		if (OAuthToken.getRefreshToken()) {
			OAuth.getRefreshToken();
		} else {
			${symbol_dollar}state.go('main');
		}

		OAuthToken.removeToken();
	});
});
