#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.social.mervid.connect;

import ${package}.social.mervid.api.Mervid;
import org.springframework.social.connect.support.OAuth2ConnectionFactory;

public class MervidConnectionFactory extends OAuth2ConnectionFactory<Mervid> {

	public MervidConnectionFactory(String appId, String appSecret) {
		super("mervid", new MervidServiceProvider(appId, appSecret), new MervidAdapter());
	}
}
