#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.web;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import ${package}.core.user.User;
import ${package}.web.security.DefaultUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

public class SessionCredentials {
	public static User getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication == null || !authentication.isAuthenticated()) {
			return null;
		}
		
		if (authentication.getPrincipal() instanceof DefaultUserDetails) {
			DefaultUserDetails user = (DefaultUserDetails) authentication.getPrincipal();
			return user.getUser();
		}
		
		if (authentication.getPrincipal() instanceof String) {
			String principal = (String) authentication.getPrincipal();
			if ("anonymousUser".equals(principal)) {
				return null;
			}
			
			User user = new User();
			user.setUsername((String) authentication.getPrincipal());
			return user;
		}
		
		return null;
	}
	
	public static String getCurrentUsername() {
		${package}.core.user.User user = getCurrentUser();
		
		if (user != null) {
			return user.getUsername();
		}
		
		return null;
	}
	
	public static List<String> getAuthorities() {
		List<String> roles = new ArrayList<String>();
		Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
		for (GrantedAuthority authority : authorities) {
			roles.add(authority.getAuthority());
		}
		
		return roles;
	}
 }
