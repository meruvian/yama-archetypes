#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.social.mervid.connect;

import ${package}.social.mervid.api.Mervid;
import ${package}.social.mervid.api.MervidTemplate;
import org.springframework.social.oauth2.AbstractOAuth2ServiceProvider;
import org.springframework.social.oauth2.OAuth2Template;


public class MervidServiceProvider extends AbstractOAuth2ServiceProvider<Mervid> {

	public MervidServiceProvider(String clientId, String clientSecret) {
		super(new OAuth2Template(clientId, clientSecret, 
				"http://www.merv.id/oauth/authorize", "http://www.merv.id/oauth/token"));
	}

	@Override
	public Mervid getApi(String accessToken) {
		return new MervidTemplate(accessToken);
	}

}
