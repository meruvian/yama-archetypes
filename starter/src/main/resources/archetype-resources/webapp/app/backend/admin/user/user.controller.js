#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').controller('UserCtrl', function (${symbol_dollar}scope, ${symbol_dollar}modal, ${symbol_dollar}location, Users, angularPopupBoxes) {
	${symbol_dollar}scope.searchParams = ${symbol_dollar}location.search();
	${symbol_dollar}scope.searchParams.hash = 0;
	${symbol_dollar}scope.page = 1;

	// Search form submitted or page changed
	${symbol_dollar}scope.search = function() {
		${symbol_dollar}scope.searchParams.hash++;
		${symbol_dollar}scope.searchParams.page = ${symbol_dollar}scope.page - 1;

		${symbol_dollar}location.search(${symbol_dollar}scope.searchParams);

		// Load list on page loaded
		Users.getList(${symbol_dollar}scope.searchParams).then(function(users) {
			${symbol_dollar}scope.users = users;
			${symbol_dollar}scope.page = users.meta.number + 1;

			angular.forEach(users, function(user) {
				user.getList('roles').then(function(roles) {
					user.roles = roles;
				});
			});
		});
	};

	${symbol_dollar}scope.search();

	// ID clicked, open popup form dialog
	${symbol_dollar}scope.openForm = function(user) {
		var modal = ${symbol_dollar}modal.open({
			templateUrl: 'user.form.html',
			controller: 'UserFormCtrl',
			size: 'lg',
			resolve: {
				user: function() {
					return user || {};
				}
			}
		});

		modal.result.then(function(u) {
			${symbol_dollar}scope.searchParams.q = u.username;
			${symbol_dollar}scope.search();
		});
	};

	${symbol_dollar}scope.changePasswd = function(user) {
		var modal = ${symbol_dollar}modal.open({
			templateUrl: 'user.passwd.html',
			controller: 'UserChangePasswdFormCtrl',
			size: 'lg',
			resolve: {
				user: function() {
					return user;
				}
			}
		});

		modal.result.then(function() {
			${symbol_dollar}scope.search();
		});
	};

	${symbol_dollar}scope.addRole = function(user) {
		var modal = ${symbol_dollar}modal.open({
			templateUrl: 'user.role.html',
			controller: 'UserEditRoleFormCtrl',
			size: 'lg',
			resolve: {
				user: function() {
					return user;
				}
			}
		});

		modal.result.then(function() {
			${symbol_dollar}scope.search(${symbol_dollar}scope.searchParams);
		});
	};

	// Open popup confirmation and delete user if user choose yes
	${symbol_dollar}scope.remove = function(user) {
		angularPopupBoxes.confirm('Are you sure want to delete this data?').result.then(function() {
			user.remove().then(function() {
				${symbol_dollar}scope.search(${symbol_dollar}scope.searchParams);
			});
		});
	};
}).controller('UserFormCtrl', function(${symbol_dollar}scope, ${symbol_dollar}modalInstance, ${symbol_dollar}validation, Users, Roles, user) {
	${symbol_dollar}scope.roles = [];
	${symbol_dollar}scope.user = user;

	if (user) {
		user.confirmPassword = user.password;
	}

	var success = function(u) {
		${symbol_dollar}modalInstance.close(u);
	};

	var error = function() {
		${symbol_dollar}scope.error = true;
	};

	${symbol_dollar}scope.submit = function(user, form) {
		${symbol_dollar}validation.validate(form).success(function() {
			${symbol_dollar}scope.error = false;
			if (user.id) {
				user.put().then(success, error);
			} else {
				Users.post(user).then(success, error);
			}
		});
	};
}).controller('UserChangePasswdFormCtrl', function(${symbol_dollar}scope, ${symbol_dollar}modalInstance, ${symbol_dollar}validation, user) {
	user.password = '';
	${symbol_dollar}scope.user = user;

	${symbol_dollar}scope.submit = function(u, form) {
		${symbol_dollar}validation.validate(form).success(function() {
			${symbol_dollar}scope.error = false;

			u.post('password').then(function() {
				${symbol_dollar}modalInstance.close();
			}, function() {
				${symbol_dollar}scope.error = true;
			});
		});
	};
}).controller('UserEditRoleFormCtrl', function(${symbol_dollar}scope, ${symbol_dollar}modalInstance, $cacheFactory, Roles, user) {
	${symbol_dollar}scope.user = user;
	${symbol_dollar}scope.roles = [];

	var invalidateCache = function() {
		${symbol_dollar}cacheFactory.get('${symbol_dollar}http').remove(user.one('roles').getRequestedUrl());
	};

	${symbol_dollar}scope.loadRoles = function(search) {
		Roles.getList({ q: search }).then(function(roles) {
			${symbol_dollar}scope.roles = roles;
		});
	};

	${symbol_dollar}scope.addRole = function(role) {
		user.one('roles', role.id).put().then(function() {
			invalidateCache();
		});
	};

	${symbol_dollar}scope.removeRole = function(role) {
		user.one('roles', role.id).remove().then(function() {
			invalidateCache();
		});
	};

	${symbol_dollar}scope.done = ${symbol_dollar}modalInstance.close;
});
