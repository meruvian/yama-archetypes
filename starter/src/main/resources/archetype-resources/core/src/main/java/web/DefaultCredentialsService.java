#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.web;

import javax.inject.Inject;

import ${package}.core.user.User;
import ${package}.core.user.UserRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class DefaultCredentialsService implements CredentialsService {
	@Inject
	private UserRepository userRepository;
	
	@Inject
	private UserDetailsService userDetailsService;
	
	@Override
	public void registerAuthentication(String userId) {
		User user = userRepository.findById(userId);
		UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
		
		Authentication auth = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
		SecurityContextHolder.getContext().setAuthentication(auth);
	}
}
