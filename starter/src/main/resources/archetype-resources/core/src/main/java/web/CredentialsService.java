#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.web;


public interface CredentialsService {
	void registerAuthentication(String userId);
}
