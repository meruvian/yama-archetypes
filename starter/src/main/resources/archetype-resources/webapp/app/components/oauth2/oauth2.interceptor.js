#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('yamaOauth').factory('YamaOauthInterceptor', function(${symbol_dollar}rootScope, $q, AccessToken) {
	return {
		request: function($config) {
			if (AccessToken.get()) {
				${symbol_dollar}config.headers.Authorization = 'Bearer ' + AccessToken.get().access_token;
			}
			return ${symbol_dollar}config;
		},
		responseError: function(rejection) {
			if (401 === rejection.status) {
				${symbol_dollar}rootScope.${symbol_dollar}broadcast('oauth:unauthorized', rejection);
			}

			return ${symbol_dollar}q.reject(rejection);
		}
	};
}).config(function(${symbol_dollar}httpProvider) {
	${symbol_dollar}httpProvider.interceptors.push('YamaOauthInterceptor');
});
