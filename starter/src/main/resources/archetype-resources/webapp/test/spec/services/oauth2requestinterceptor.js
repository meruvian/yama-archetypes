#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

describe('Service: Oauth2RequestInterceptor', function () {

  // load the service's module
  beforeEach(module('${artifactId}App'));

  // instantiate service
  var Oauth2RequestInterceptor;
  beforeEach(inject(function (_Oauth2RequestInterceptor_) {
    Oauth2RequestInterceptor = _Oauth2RequestInterceptor_;
  }));

  it('should do something', function () {
    expect(!!Oauth2RequestInterceptor).toBe(true);
  });

});
