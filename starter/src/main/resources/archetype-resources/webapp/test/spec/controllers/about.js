#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

describe('Controller: AboutCtrl', function () {

  // load the controller's module
  beforeEach(module('${artifactId}App'));

  var AboutCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (${symbol_dollar}controller, ${symbol_dollar}rootScope) {
    scope = ${symbol_dollar}rootScope.${symbol_dollar}new();
    AboutCtrl = ${symbol_dollar}controller('AboutCtrl', {
      ${symbol_dollar}scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
