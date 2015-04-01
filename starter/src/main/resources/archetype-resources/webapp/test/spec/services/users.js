#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

describe('Service: Users', function () {

  // load the service's module
  beforeEach(module('${artifactId}App'));

  // instantiate service
  var Users;
  beforeEach(inject(function (_Users_) {
    Users = _Users_;
  }));

  it('should do something', function () {
    expect(!!Users).toBe(true);
  });

});
