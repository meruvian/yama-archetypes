#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

describe('Service: Interceptors', function () {

  // load the service's module
  beforeEach(module('${artifactId}App'));

  // instantiate service
  var Interceptors;
  beforeEach(inject(function (_Interceptors_) {
    Interceptors = _Interceptors_;
  }));

  it('should do something', function () {
    expect(!!Interceptors).toBe(true);
  });

});
