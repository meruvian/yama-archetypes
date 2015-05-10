#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').controller('DashboardCtrl', function (${symbol_dollar}scope, Dashboards) {
	Dashboards.metrics.one().get().then(function(metrics) {
		${symbol_dollar}scope.metrics = [];

		angular.forEach(metrics, function(value, key) {
			if (!angular.isFunction(value)) {
				this.push({ key: key, value: value });
			}
		}, ${symbol_dollar}scope.metrics);
	});
});
