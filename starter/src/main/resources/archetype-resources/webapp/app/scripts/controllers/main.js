#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

/**
 * @ngdoc function
 * @name yamaApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the yamaApp
 */
angular.module('${artifactId}App').controller('MainCtrl', function (${symbol_dollar}scope, Monitoring) {
	Monitoring.metrics.one().get().then(function(metrics) {
		${symbol_dollar}scope.metrics = [];

		angular.forEach(metrics, function(value, key) {
			if (!angular.isFunction(value)) {
				this.push({ key: key, value: value });
			}
		}, ${symbol_dollar}scope.metrics);
	});
});
