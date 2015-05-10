#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

angular.module('${artifactId}App').config(function(validationSchemaProvider) {
	var applicationValidator = {
		name: {
			'validations': 'required',
			'validate-on': 'blur',
			'messages': {
				'required': {
					'error': 'Name cannot be blank',
					'success': 'Ok'
				}
			}
		},
		website: {
			'validations': 'url, required',
			'validate-on': 'blur',
			'messages': {
				'required': {
					'error': 'Site cannot be blank',
					'success': 'Ok'
				},
				'url': {
					'error': 'Not a valid URL',
					'success': 'Ok'
				}
			}
		},
		redirect: {
			'validations': 'url, required',
			'validate-on': 'blur',
			'messages': {
				'required': {
					'error': 'Site cannot be blank',
					'success': 'Ok'
				},
				'url': {
					'error': 'Not a valid URL',
					'success': 'Ok'
				}
			}
		}
	};

	validationSchemaProvider.set('application', applicationValidator);
});
