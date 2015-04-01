#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

/**
 * @ngdoc service
 * @name yamaApp.ProfilePictures
 * @description
 * # ProfilePictures
 * Factory in the yamaApp.
 */
angular.module('${artifactId}App').factory('ProfilePictures', function (Users, AccessToken, $upload, ${symbol_dollar}rootScope) {
	return {
		uploadPhoto: function (file, progress, success, error) {
			var fileReader = new FileReader();
			var imageUrl = Users.one('me').one('photo').getRequestedUrl();

			fileReader.readAsArrayBuffer(file);
			fileReader.onload = function(e) {
				${symbol_dollar}upload.http({
					url: imageUrl,
					headers: {'Content-Type': file.type},
					data: e.target.result
				}).progress(progress).success(success).error(error);
			};
		},
		getPhotoUrl: function() {
			return Users.one('me').one('photo').getRequestedUrl() + '?access_token=' + AccessToken.get().access_token;
		},
		reloadPhoto: function() {
			${symbol_dollar}rootScope.currentUserPhoto = this.getPhotoUrl() + '&cache=' + (new Date()).getTime();
		}
	};
});
