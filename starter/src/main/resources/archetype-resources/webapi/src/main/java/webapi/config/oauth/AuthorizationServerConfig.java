#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.webapi.config.oauth;

import java.util.Arrays;

import javax.inject.Inject;
import javax.inject.Named;

import ${package}.webapi.interceptor.SameOriginOauthClientFilter;
import org.springframework.boot.context.embedded.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.token.AccessTokenConverter;
import org.springframework.security.oauth2.provider.token.DefaultTokenServices;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {
	@Inject
	private DefaultTokenServices tokenServices;
	
	@Inject
	private ClientDetailsService clientDetailsService;
	
	@Inject
	@Named("tokenConverter")
	private AccessTokenConverter accessTokenConverter;
	
	@Inject
	@Named("authenticationManagerBean")
	private AuthenticationManager authenticationManager;
	
	@Override
	public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
		clients.withClientDetails(clientDetailsService);
	}
	
	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints.authenticationManager(authenticationManager)
			.tokenServices(tokenServices)
			.accessTokenConverter(accessTokenConverter);
	}
	
	@Bean
	public FilterRegistrationBean sameOriginOauthFilter(SameOriginOauthClientFilter filter) {
		FilterRegistrationBean bean = new FilterRegistrationBean(filter);
		bean.setUrlPatterns(Arrays.asList("/oauth/token"));
		
		return bean;
	}
}
