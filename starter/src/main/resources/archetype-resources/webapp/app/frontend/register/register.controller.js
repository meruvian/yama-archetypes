#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').controller('RegisterCtrl', function (${symbol_dollar}scope, ${symbol_dollar}validation, Registers) {
	${symbol_dollar}scope.register = function(user, form) {
		${symbol_dollar}validation.validate(form).success(function() {
			${symbol_dollar}scope.error = false;

			Registers.post(user).then(function() {
				window.location.href = '/';
			}, function() {
				${symbol_dollar}scope.error = true;
			});
		});
	};
});
