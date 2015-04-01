#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

describe('Controller: HeaderCtrl', function () {

  // load the controller's module
  beforeEach(module('${artifactId}App'));

  var HeaderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, ${symbol_dollar}rootScope) {
    scope = ${symbol_dollar}rootScope.$new();
    HeaderCtrl = $controller('HeaderCtrl', {
      ${symbol_dollar}scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
