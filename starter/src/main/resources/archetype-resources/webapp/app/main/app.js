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
	'angular-loading-bar',
	'restangular',
	'angularPopupBoxes',
	'angularFileUpload',
	'validation',
	'validation.rule',
	'validation.schema',
	'yamaOauth'
]).config(function (${symbol_dollar}locationProvider, ${symbol_dollar}urlRouterProvider, ${symbol_dollar}urlMatcherFactoryProvider) {
	${symbol_dollar}locationProvider.html5Mode(true).hashPrefix('!');

	${symbol_dollar}urlRouterProvider.otherwise('/');

	${symbol_dollar}urlMatcherFactoryProvider.strictMode(false);
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
}).config(function(YamaOAuthProvider) {
	YamaOAuthProvider.configure({
		scope: 'read write',
		clientId: 'yama',
		redirectUri: '/'
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
}).run(function(${symbol_dollar}rootScope, YamaOAuth, Users, ProfilePictures) {
	${symbol_dollar}rootScope.${symbol_dollar}state = {};

	if (!YamaOAuth.isAuthorized()) {
		YamaOAuth.login();
	} else {
		if (!${symbol_dollar}rootScope.currentUser) {
			Users.one('me').get().then(function(user) {
				${symbol_dollar}rootScope.currentUser = user;

				ProfilePictures.reloadPhoto();
			});
		}
	}

	${symbol_dollar}rootScope.${symbol_dollar}on('oauth:unauthorized', function() {
		YamaOAuth.login();
	});

	${symbol_dollar}rootScope.${symbol_dollar}on('oauth:logout', function() {
		YamaOAuth.login();
	});

	${symbol_dollar}rootScope.${symbol_dollar}on('${symbol_dollar}stateChangeStart', function(event, toState, toParams) {
		if (!YamaOAuth.isAuthorized()) {
			event.preventDefault();

			${symbol_dollar}rootScope.${symbol_dollar}state.toState = toState;
			${symbol_dollar}rootScope.${symbol_dollar}state.toState.params = toParams;

			YamaOAuth.login();
		}
	});
});
