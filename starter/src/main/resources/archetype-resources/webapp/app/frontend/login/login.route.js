#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').config(function (${symbol_dollar}stateProvider) {
	${symbol_dollar}stateProvider.state('login', {
		url: '/login',
		controller: 'LoginCtrl'
	});

	${symbol_dollar}stateProvider.state('logout', {
		url: '/logout',
		controller: 'LogoutCtrl'
	});
});
