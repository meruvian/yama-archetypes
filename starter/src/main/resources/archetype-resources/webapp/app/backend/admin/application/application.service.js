#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').factory('Applications', function (Restangular) {
	return Restangular.service('applications');
});
