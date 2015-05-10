#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').controller('MainCtrl', function (${symbol_dollar}state) {
	${symbol_dollar}state.go('backend.dashboard');
});
