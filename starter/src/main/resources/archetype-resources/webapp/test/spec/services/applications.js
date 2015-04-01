#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

describe('Service: Applications', function () {

  // load the service's module
  beforeEach(module('${artifactId}App'));

  // instantiate service
  var Applications;
  beforeEach(inject(function (_Applications_) {
    Applications = _Applications_;
  }));

  it('should do something', function () {
    expect(!!Applications).toBe(true);
  });

});
