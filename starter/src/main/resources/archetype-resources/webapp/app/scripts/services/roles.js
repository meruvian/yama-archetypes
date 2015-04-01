#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

/**
 * @ngdoc service
 * @name yamaApp.Roles
 * @description
 * # Roles
 * Factory in the yamaApp.
 */
angular.module('${artifactId}App').factory('Roles', function (Restangular) {
	return Restangular.service('roles');
});
