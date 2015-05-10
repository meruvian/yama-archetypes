#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').config(function (${symbol_dollar}stateProvider) {
	${symbol_dollar}stateProvider.state('backend.profile', {
		url: '/account/profile',
		templateUrl: 'backend/account/profile/profile.html',
		controller: 'ProfileCtrl'
	});
});
