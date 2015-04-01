#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
'use strict';

describe('Service: ProfilePictures', function () {

  // load the service's module
  beforeEach(module('${artifactId}App'));

  // instantiate service
  var ProfilePictures;
  beforeEach(inject(function (_ProfilePictures_) {
    ProfilePictures = _ProfilePictures_;
  }));

  it('should do something', function () {
    expect(!!ProfilePictures).toBe(true);
  });

});
