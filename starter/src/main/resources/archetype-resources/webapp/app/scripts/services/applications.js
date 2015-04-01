#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

/**
 * @ngdoc service
 * @name yamaApp.Applications
 * @description
 * # Applications
 * Factory in the yamaApp.
 */
angular.module('${artifactId}App').factory('Applications', function (Restangular) {
	return Restangular.service('applications');
});
