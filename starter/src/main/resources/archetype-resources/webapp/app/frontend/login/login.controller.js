#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').controller('LoginCtrl', function (${symbol_dollar}scope, ${symbol_dollar}state, ${symbol_dollar}rootScope, ${symbol_dollar}location, OAuth, Users) {
	${symbol_dollar}scope.isAuthenticated = true;

	${symbol_dollar}scope.go = function() {
		if (${symbol_dollar}rootScope.${symbol_dollar}state.toState) {
			var toState = ${symbol_dollar}rootScope.${symbol_dollar}state.toState;
			delete ${symbol_dollar}rootScope.${symbol_dollar}state.toState;

			${symbol_dollar}state.go(toState.name, toState.params);
		} else {
			${symbol_dollar}state.go('main');
		}
	};

	if (OAuth.isAuthenticated()) {
		${symbol_dollar}scope.go();
	} else {
		Users.one('me').get().then(function() {
			OAuth.getAccessTokenFromCode();
		});
	}

	${symbol_dollar}scope.login = function(user) {
		${symbol_dollar}scope.isAuthenticated = true;

		OAuth.getAccessToken(user).then(function() {
			${symbol_dollar}scope.go();
		}, function() {
			${symbol_dollar}scope.isAuthenticated = false;
		});
	};
}).controller('LogoutCtrl', function(${symbol_dollar}state, ${symbol_dollar}http, OAuthToken) {
	${symbol_dollar}http.get('logout').success(function() {
		OAuthToken.removeToken();
		${symbol_dollar}state.go('main');
	});
});
