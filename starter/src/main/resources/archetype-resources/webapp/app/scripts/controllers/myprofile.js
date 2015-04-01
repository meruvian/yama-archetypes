#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

/**
 * @ngdoc function
 * @name yamaApp.controller:MyprofileCtrl
 * @description
 * # MyprofileCtrl
 * Controller of the yamaApp
 */
angular.module('${artifactId}App').controller('MyProfileCtrl', function (${symbol_dollar}rootScope, ${symbol_dollar}scope, Users, ProfilePictures, angularPopupBoxes) {
	var users = Users.one('me');

	users.get().then(function(user) {
		${symbol_dollar}scope.user = user;
	});

	${symbol_dollar}scope.$watch('files', function() {
		if (${symbol_dollar}scope.files) {
			var file = ${symbol_dollar}scope.files[0];

			ProfilePictures.uploadPhoto(file, function() {

			}, function() {
				ProfilePictures.reloadPhoto();
			});
		}
	});

	var success = function(user) {
		${symbol_dollar}rootScope.currentUser = user;
		${symbol_dollar}scope.passwd = {};

		angularPopupBoxes.alert('Update success');
	};

	var error = function() {
		${symbol_dollar}scope.error = true;
	};

	${symbol_dollar}scope.submit = function(user) {
		${symbol_dollar}scope.error = false;

		if (user.id) {
			user.put().then(success, error);
		} else {
			Users.post(user).then(success, error);
		}
	};

	${symbol_dollar}scope.updatePassword = function(passwd) {
		users.password = passwd.newpass;
		users.post('password').then(success);
	};
});
