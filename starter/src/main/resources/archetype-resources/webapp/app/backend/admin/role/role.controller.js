#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').controller('RoleCtrl', function (${symbol_dollar}scope, ${symbol_dollar}modal, ${symbol_dollar}location, Roles, angularPopupBoxes) {
	${symbol_dollar}scope.searchParams = ${symbol_dollar}location.search();
	${symbol_dollar}scope.searchParams.hash = 0;
	${symbol_dollar}scope.page = 1;

	// Search form submitted or page changed
	${symbol_dollar}scope.search = function() {
		${symbol_dollar}scope.searchParams.hash++;
		${symbol_dollar}scope.searchParams.page = ${symbol_dollar}scope.page - 1;

		${symbol_dollar}location.search(${symbol_dollar}scope.searchParams);

		// Load list on page loaded
		Roles.getList(${symbol_dollar}scope.searchParams).then(function(roles) {
			${symbol_dollar}scope.roles = roles;
			${symbol_dollar}scope.page = roles.meta.number + 1;
		});
	};

	${symbol_dollar}scope.search();

	// ID clicked, open popup form dialog
	${symbol_dollar}scope.openForm = function(role) {
		var modal = ${symbol_dollar}modal.open({
			templateUrl: 'role.form.html',
			controller: 'RoleFormCtrl',
			size: 'lg',
			resolve: {
				role: function() {
					return role;
				}
			}
		});

		modal.result.then(function(r) {
			${symbol_dollar}scope.searchParams.q = r.name;
			${symbol_dollar}scope.search();
		});
	};

	// Open popup confirmation and delete user if user choose yes
	${symbol_dollar}scope.remove = function(role) {
		angularPopupBoxes.confirm('Are you sure want to delete this data?').result.then(function() {
			role.remove().then(function() {
				${symbol_dollar}scope.search();
			});
		});
	};
}).controller('RoleFormCtrl', function(${symbol_dollar}scope, ${symbol_dollar}modalInstance, ${symbol_dollar}validation, Roles, role) {
	if (role) {
		${symbol_dollar}scope.role = role;
	}

	var success = function(r) {
		${symbol_dollar}modalInstance.close(r);
	};

	var error = function() {
		${symbol_dollar}scope.error = true;
	};

	${symbol_dollar}scope.submit = function(role, form) {
		${symbol_dollar}validation.validate(form).success(function() {
			${symbol_dollar}scope.error = false;

			if (role.id) {
				role.put().then(success, error);
			} else {
				Roles.post(role).then(success, error);
			}
		});
	};
});
