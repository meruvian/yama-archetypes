#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('${artifactId}App'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (${symbol_dollar}controller, ${symbol_dollar}rootScope) {
    scope = ${symbol_dollar}rootScope.${symbol_dollar}new();
    MainCtrl = ${symbol_dollar}controller('MainCtrl', {
      ${symbol_dollar}scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
