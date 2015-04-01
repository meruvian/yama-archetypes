#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.social.mervid.api;

import ${package}.core.user.User;
import org.springframework.web.client.RestTemplate;


public class UserTemplate implements UserOperations {
	private RestTemplate restTemplate;

	public UserTemplate(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}
	
	@Override
	public User getUser() {
		return restTemplate.getForObject("http://api.merv.id/v1/admin/users/me", User.class);
	}

}
