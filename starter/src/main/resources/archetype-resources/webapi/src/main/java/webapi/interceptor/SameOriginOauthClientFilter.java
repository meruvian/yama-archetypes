#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.webapi.interceptor;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.Response.Status;

import org.apache.commons.lang3.StringUtils;
import ${package}.web.security.oauth.DefaultOauthApplications;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

@Component
public class SameOriginOauthClientFilter extends GenericFilterBean {
	private final Logger log = LoggerFactory.getLogger(getClass());
	
	@Inject
	private DefaultOauthApplications defaultApps;
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		String clientId = request.getParameter("client_id");
		if (defaultApps.containsKey(clientId)) {
			log.info("Auth request from '{}' with clientId '{}'", request.getRemoteAddr(), clientId);
			
			if (!StringUtils.equals(request.getLocalAddr(), request.getRemoteAddr())) {
				HttpServletResponse res = (HttpServletResponse) response;
				res.setStatus(Status.UNAUTHORIZED.getStatusCode());
				
				log.warn("Cross origin request from '{}', local addr is '{}', rejecting", 
						request.getRemoteAddr(), request.getLocalAddr());
				
				return;
			}
		}
		
		chain.doFilter(request, response);
	}

}
