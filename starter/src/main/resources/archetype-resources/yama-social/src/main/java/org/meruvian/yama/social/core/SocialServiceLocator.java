#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package org.meruvian.yama.social.core;

import org.springframework.social.connect.ConnectionFactoryLocator;

public interface SocialServiceLocator extends ConnectionFactoryLocator {
	SocialService<?> getSocialService(String name);
	
	<T> SocialService<T> getSocialService(Class<T> apiType);
}
