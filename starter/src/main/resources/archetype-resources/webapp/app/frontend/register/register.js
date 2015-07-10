#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App', [
	'angular-loading-bar',
	'restangular',
	'validation',
	'validation.rule',
	'validation.schema'
]).config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl('/api');
	RestangularProvider.setDefaultHttpFields({cache: false});

	RestangularProvider.addResponseInterceptor(function(data, operation) {
		var extractedData;

		if (operation === 'getList' && angular.isObject(data)) {
			extractedData = angular.copy(data.content, extractedData);
			delete data.content;
			extractedData.meta = data;
		} else {
			extractedData = data;
		}

		return extractedData;
	});
}).config(function(${symbol_dollar}validationProvider) {
	${symbol_dollar}validationProvider.showSuccessMessage = false;

	${symbol_dollar}validationProvider.invalidCallback = function(element) {
		${symbol_dollar}(element).parents('.form-group:first').addClass('has-error');
	};

	${symbol_dollar}validationProvider.validCallback = function(element) {
		${symbol_dollar}(element).parents('.form-group:first').removeClass('has-error');
	};

	${symbol_dollar}validationProvider.setErrorHTML(function (msg) {
		return '<p class=\"text-danger\">' + msg + '</p>';
	});

	${symbol_dollar}validationProvider.setSuccessHTML(function (msg) {
		return '<p class=\"text-success\">' + msg + '</p>';
	});
}).run(function(${symbol_dollar}validation, Registers) {
	${symbol_dollar}validation.setExpression({
		match: function (value, scope, element, attrs, param) {
			return value === ${symbol_dollar}(param).val();
		},
		userexist: function (value) {
			return Registers.one().get({u: value}).then(function(user) {
				return !user;
			}, function() {
				return true;
			});
		},
		alphanumeric: /^[a-z0-9]+${symbol_dollar}/i
	});
});
