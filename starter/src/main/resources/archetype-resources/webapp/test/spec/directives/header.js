#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

describe('Directive: header', function () {

  // load the directive's module
  beforeEach(module('${artifactId}App'));

  var element,
    scope;

  beforeEach(inject(function (${symbol_dollar}rootScope) {
    scope = ${symbol_dollar}rootScope.${symbol_dollar}new();
  }));

  it('should make hidden element visible', inject(function (${symbol_dollar}compile) {
    element = angular.element('<header></header>');
    element = ${symbol_dollar}compile(element)(scope);
    expect(element.text()).toBe('this is the header directive');
  }));
});
