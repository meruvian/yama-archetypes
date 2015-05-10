#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').directive('header', function (${symbol_dollar}rootScope) {
	return {
		restrict: 'E',
		link: function postLink(scope, element, attrs) {
			${symbol_dollar}rootScope.header = attrs.header;
			${symbol_dollar}rootScope.subheader = attrs.subheader;
		}
	};
});
