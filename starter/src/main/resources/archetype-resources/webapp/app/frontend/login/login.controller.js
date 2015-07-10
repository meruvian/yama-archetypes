#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').controller('LoginCtrl', function () {
	// do nothing
}).controller('LogoutCtrl', function(${symbol_dollar}state, ${symbol_dollar}http, YamaOAuth) {
	${symbol_dollar}http.get('/auth/logout').success(function() {
		YamaOAuth.logout();
	});
});
