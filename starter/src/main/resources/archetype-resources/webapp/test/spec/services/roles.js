#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

describe('Service: Roles', function () {

  // load the service's module
  beforeEach(module('${artifactId}App'));

  // instantiate service
  var Roles;
  beforeEach(inject(function (_Roles_) {
    Roles = _Roles_;
  }));

  it('should do something', function () {
    expect(!!Roles).toBe(true);
  });

});
