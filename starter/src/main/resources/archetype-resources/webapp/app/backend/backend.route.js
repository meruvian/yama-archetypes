#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').config(function (${symbol_dollar}stateProvider) {
	${symbol_dollar}stateProvider.state('backend', {
		url: '/backend',
		templateUrl: 'backend/backend.html',
		controller: 'BackendCtrl'
	});
});
