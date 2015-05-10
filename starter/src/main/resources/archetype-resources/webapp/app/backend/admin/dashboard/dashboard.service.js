#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').factory('Dashboards', function (Restangular) {
	return {
		metrics: Restangular.service('actuator/metrics')
	};
});
