#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').factory('Roles', function (Restangular) {
	return Restangular.service('roles');
});
