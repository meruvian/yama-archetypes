#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.social.mervid.api;

import org.springframework.social.ApiBinding;

public interface Mervid extends ApiBinding {
	UserOperations userOperations();
}
