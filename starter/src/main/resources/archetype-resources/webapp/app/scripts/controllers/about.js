#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

/**
 * @ngdoc function
 * @name yamaApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the yamaApp
 */
angular.module('${artifactId}App')
  .controller('AboutCtrl', function (${symbol_dollar}scope) {
    ${symbol_dollar}scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
