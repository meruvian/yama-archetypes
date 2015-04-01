#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

/**
 * @ngdoc service
 * @name yamaApp.Users
 * @description
 * # Users
 * Factory in the yamaApp.
 */
angular.module('${artifactId}App').factory('Users', function (Restangular) {
	return Restangular.service('users');
});
