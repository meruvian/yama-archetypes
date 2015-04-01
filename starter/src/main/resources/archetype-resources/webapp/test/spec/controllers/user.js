#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

describe('Controller: UserCtrl', function () {

  // load the controller's module
  beforeEach(module('${artifactId}App'));

  var UserCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, ${symbol_dollar}rootScope) {
    scope = ${symbol_dollar}rootScope.$new();
    UserCtrl = $controller('UserCtrl', {
      ${symbol_dollar}scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
