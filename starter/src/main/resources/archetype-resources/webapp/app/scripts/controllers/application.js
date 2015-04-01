#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

/**
 * @ngdoc function
 * @name yamaApp.controller:ApplicationCtrl
 * @description
 * # ApplicationCtrl
 * Controller of the yamaApp
 */
angular.module('${artifactId}App').controller('ApplicationCtrl', function (${symbol_dollar}scope, ${symbol_dollar}modal, ${symbol_dollar}location, Applications, angularPopupBoxes) {
	${symbol_dollar}scope.searchParams = ${symbol_dollar}location.search();

	// Load list on page loaded
	Applications.getList(${symbol_dollar}scope.searchParams).then(function(applications) {
		${symbol_dollar}scope.applications = applications;
		${symbol_dollar}scope.page = applications.meta.number + 1;
	});

	// Search form submitted or page changed
	${symbol_dollar}scope.search = function(p) {
		p.cache = p.cache || 0;
		p.cache++;
		p.page = ${symbol_dollar}scope.page - 1;

		${symbol_dollar}location.search(p);
	};

	// ID clicked, open popup form dialog
	${symbol_dollar}scope.openForm = function(application, changeSecret) {
		var modal = ${symbol_dollar}modal.open({
			templateUrl: 'applicationForm.html',
			controller: 'ApplicationFormCtrl',
			size: 'lg',
			resolve: {
				application: function() {
					return application;
				},
				changeSecret: function() {
					return changeSecret;
				}
			}
		});

		modal.result.then(function() {
			${symbol_dollar}scope.search(${symbol_dollar}scope.searchParams);
		});
	};

	// Open popup confirmation and delete user if user choose yes
	${symbol_dollar}scope.remove = function(application) {
		angularPopupBoxes.confirm('Are you sure want to delete this data?').result.then(function() {
			application.remove().then(function() {
				${symbol_dollar}scope.search(${symbol_dollar}scope.searchParams);
			});
		});
	};
}).controller('ApplicationFormCtrl', function(${symbol_dollar}scope, ${symbol_dollar}modalInstance, Applications, application, changeSecret) {
	${symbol_dollar}scope.changeSecret = changeSecret || false;

	if (application) {
		application.redirectUri = application.registeredRedirectUris[0];
		${symbol_dollar}scope.application = application;
	}

	var success = function() {
		${symbol_dollar}modalInstance.close();
	};

	var error = function() {
		${symbol_dollar}scope.error = true;
	};

	${symbol_dollar}scope.submit = function(application) {
		application.registeredRedirectUris = [];
		application.registeredRedirectUris.push(application.redirectUri);

		${symbol_dollar}scope.error = false;

		if (application.id) {
			application.put().then(success, error);
		} else {
			Applications.post(application).then(success, error);
		}
	};

	${symbol_dollar}scope.generateSecret = function(application) {
		application.post('secret').then(function(a) {
			${symbol_dollar}scope.application.secret = a.secret;
		}, error);
	};
});
