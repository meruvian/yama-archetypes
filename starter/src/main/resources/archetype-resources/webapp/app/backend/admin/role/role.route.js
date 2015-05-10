#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').config(function (${symbol_dollar}stateProvider) {
	${symbol_dollar}stateProvider.state('backend.role', {
		url: '/admin/role',
		templateUrl: 'backend/admin/role/role.html',
		controller: 'RoleCtrl'
	});
});
