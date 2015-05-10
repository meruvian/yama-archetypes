#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.webapi.service;

import javax.ws.rs.Path;

import ${package}.core.user.User;

@Path("/signup")
public interface SignUpService {
	User signUp(User user);
}
