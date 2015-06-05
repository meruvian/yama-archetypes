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

	this.configure = function(params) {
		if (!(params instanceof Object)) {
			throw new TypeError('Config must be object');
		}

		config = angular.extend({}, defaultConfig, params);
	};

	this.$get = function($injector, Endpoint, AccessToken, Storage) {
		var ${symbol_dollar}rootScope = $injector.get('$rootScope');

		Storage.use(config.storage);
		Endpoint.set(config);
		AccessToken.set(config);

		${symbol_dollar}rootScope.$on('oauth:expired', function() {
			AccessToken.destroy();
		});

		return {
			login: function() {
				AccessToken.destroy();
				Endpoint.redirect();
			},
			logout: function() {
				AccessToken.destroy();
				${symbol_dollar}rootScope.$broadcast('oauth:logout');
			},
			isAuthorized: function() {
				return !(AccessToken.get() === null || AccessToken.expired());
			},
			getAccessToken: function() {
				return AccessToken.get();
			},
			isExpired: function() {
				return AccessToken.expired();
			}
		};
	};
});
