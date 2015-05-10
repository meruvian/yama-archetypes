#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

describe('Controller: DashboardCtrl', function () {

  // load the controller's module
  beforeEach(module('${artifactId}App'));

  var DashboardCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (${artifactId}controller, ${artifactId}rootScope) {
    scope = ${artifactId}rootScope.${artifactId}new();
    DashboardCtrl = ${artifactId}controller('DashboardCtrl', {
      ${artifactId}scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
