#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').controller('BackendCtrl', function (${symbol_dollar}state) {
	if ('backend' === ${symbol_dollar}state.current.name) {
		${symbol_dollar}state.transitionTo('backend.dashboard');
	}
});
