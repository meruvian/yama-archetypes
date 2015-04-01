#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

/**
 * @ngdoc service
 * @name yamaAppApp.Oauth2RequestInterceptor
 * @description
 * # Oauth2RequestInterceptor
 * Factory in the yamaAppApp.
 */
angular.module('${artifactId}App').factory('Oauth2RequestInterceptor', function (${symbol_dollar}rootScope, $q, AccessToken) {
	return {
		request: function($config) {
			if (AccessToken.get()) {
				$config.headers.Authorization = 'Bearer ' + AccessToken.get().access_token;
			}
			return $config;
		},
		responseError: function(rejection) {
			if (rejection.status === 401) {
				AccessToken.destroy(${symbol_dollar}rootScope);
				${symbol_dollar}rootScope.$broadcast('oauth:logout');
				${symbol_dollar}rootScope.$broadcast('oauth:loggedOut');
			}

			return $q.reject(rejection);
		}
	};
});
