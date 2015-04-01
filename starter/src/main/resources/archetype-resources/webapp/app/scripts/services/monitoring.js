#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

/**
 * @ngdoc service
 * @name yamaApp.Monitoring
 * @description
 * # Monitoring
 * Factory in the yamaApp.
 */
angular.module('${artifactId}App').factory('Monitoring', function (Restangular) {
	return {
		metrics: Restangular.service('actuator/metrics')
	};
});
