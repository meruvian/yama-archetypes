#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('yamaOauth').provider('YamaOAuth', function() {
	var defaultConfig = {
		clientId: '',
		redirectUri: location.protocol + '//' + location.host,
		site: location.protocol + '//' + location.host,
		authorizePath: '/oauth/authorize',
		tokenPath: '/oauth/token',
		responseType: 'token',
		state: null,
		scope: null,
		storage: 'sessionStorage'
	};

	var config = {};
	var ${symbol_dollar}rootScope, ${symbol_dollar}timeout, Endpoint, AccessToken, Storage;

	var setup = function(${symbol_dollar}injector) {
		${symbol_dollar}rootScope = ${symbol_dollar}injector.get('${symbol_dollar}rootScope');
		${symbol_dollar}timeout = ${symbol_dollar}injector.get('${symbol_dollar}timeout');
		Endpoint = ${symbol_dollar}injector.get('Endpoint');
		AccessToken = ${symbol_dollar}injector.get('AccessToken');
		Storage = ${symbol_dollar}injector.get('Storage');

		Storage.use(config.storage);
		Endpoint.set(config);
		AccessToken.set(config);

		${symbol_dollar}rootScope.${symbol_dollar}on('oauth:expired', function() {
			AccessToken.destroy();
		});
	};

	this.configure = function(params) {
		if (!(params instanceof Object)) {
			throw new TypeError('Config must be object');
		}

		config = angular.extend({}, defaultConfig, params);
	};

	this.login = function() {
		AccessToken.destroy();
		Endpoint.redirect();
	};

	this.logout = function() {
		AccessToken.destroy();
		${symbol_dollar}timeout(function() {
			${symbol_dollar}rootScope.${symbol_dollar}broadcast('oauth:logout');
		}, 500);
	};

	this.isAuthorized =  function() {
		return !(AccessToken.get() === null || AccessToken.expired());
	};

	this.getAccessToken = function() {
		return AccessToken.get();
	};

	this.isExpired = function() {
		return AccessToken.expired();
	};

	this.${symbol_dollar}get = function(${symbol_dollar}injector) {
		setup(${symbol_dollar}injector);

		return {
			login: this.login,
			logout: this.logout,
			isAuthorized: this.isAuthorized,
			getAccessToken: this.getAccessToken,
			isExpired: this.isExpired
		};
	};
});
