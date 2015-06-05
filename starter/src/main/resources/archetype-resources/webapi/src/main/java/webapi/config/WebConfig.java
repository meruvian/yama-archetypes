#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.webapi.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.AutoConfigureAfter;
import org.springframework.boot.autoconfigure.web.DispatcherServletAutoConfiguration;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration.WebMvcAutoConfigurationAdapter;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;

@Configuration
@AutoConfigureAfter(DispatcherServletAutoConfiguration.class)
public class WebConfig extends WebMvcAutoConfigurationAdapter {	
	private final Logger log = LoggerFactory.getLogger(getClass());
	
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		log.debug("Configure view controllers");
		super.addViewControllers(registry);
		
		registry.addViewController("/login").setViewName("forward:/login.html");
	}
}
