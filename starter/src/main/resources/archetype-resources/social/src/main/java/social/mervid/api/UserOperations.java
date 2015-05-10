#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.social.mervid.api;

import ${package}.core.user.User;

public interface UserOperations {
	User getUser();
}
