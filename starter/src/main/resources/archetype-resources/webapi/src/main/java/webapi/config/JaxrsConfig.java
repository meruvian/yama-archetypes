#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )
/*
 * Copyright 2012-2014 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package ${package}.webapi.config;

import org.jboss.resteasy.plugins.providers.jackson.Jackson2JsonpInterceptor;
import org.jboss.resteasy.plugins.spring.SpringBeanProcessor;
import org.jboss.resteasy.spi.ResteasyDeployment;
import org.jboss.resteasy.spi.ResteasyProviderFactory;
import org.jboss.resteasy.springmvc.ResteasyHandlerAdapter;
import org.jboss.resteasy.springmvc.ResteasyHandlerMapping;
import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;

@Configuration
@EnableConfigurationProperties
@ConditionalOnClass(ResteasyHandlerMapping.class)
public class JaxrsConfig {
		
	@Bean(initMethod="start", destroyMethod="stop")
	@ConditionalOnMissingBean(ResteasyDeployment.class)
	@ConfigurationProperties(prefix="resteasy.deployment")
	public ResteasyDeployment resteasyDeployment(final SpringBeanProcessor springBeanProcessor) {
		ResteasyDeployment resteasyDeployment = new ResteasyDeployment() {
			public void start() {
				super.start();
				if (springBeanProcessor.getRegistry() == null) {
					springBeanProcessor.setRegistry(this.getRegistry());
				}
			}
		};
		resteasyDeployment.setProviderFactory(springBeanProcessor.getProviderFactory());
		return resteasyDeployment;
	}

	@Bean
	@ConditionalOnMissingBean(SpringBeanProcessor.class)
	public SpringBeanProcessor springBeanProcessor() {
		SpringBeanProcessor springBeanProcessor = new SpringBeanProcessor();
		springBeanProcessor.setProviderFactory(new ResteasyProviderFactory());
		return springBeanProcessor;
	}

	@Bean
	@ConditionalOnMissingBean(ResteasyHandlerMapping.class)
	public ResteasyHandlerMapping resteasyHandlerMapper(ResteasyDeployment deployment) {
		ResteasyHandlerMapping handlerMapping = new ResteasyHandlerMapping(deployment);
		handlerMapping.setOrder(Ordered.LOWEST_PRECEDENCE - 10);
		return handlerMapping;
	}

	@Bean
	@ConditionalOnMissingBean(ResteasyHandlerAdapter.class)
	public ResteasyHandlerAdapter resteasyHandlerAdapter(ResteasyDeployment deployment) {
		return new ResteasyHandlerAdapter(deployment);
	}
	
	@Bean
	public Jackson2JsonpInterceptor jsonpInterceptor() {
		return new Jackson2JsonpInterceptor();
	}
}
