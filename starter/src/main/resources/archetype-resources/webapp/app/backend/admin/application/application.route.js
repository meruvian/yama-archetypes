#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').config(function (${symbol_dollar}stateProvider) {
	${symbol_dollar}stateProvider.state('backend.application', {
		url: '/admin/application',
		templateUrl: 'backend/admin/application/application.html',
		controller: 'ApplicationCtrl'
	});
});
