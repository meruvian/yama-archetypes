#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.social.mervid;

import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import ${package}.core.LogInformation;
import ${package}.core.commons.Address;
import ${package}.core.user.User;
import ${package}.social.core.AbstractSocialService;
import ${package}.social.mervid.api.Mervid;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.support.OAuth2ConnectionFactory;

public class MervidService extends AbstractSocialService<Mervid>{
	public MervidService(OAuth2ConnectionFactory<Mervid> connectionFactory) {
		super(connectionFactory);
	}

	@Override
	public User createUser(Connection<?> connection) {
		Mervid mervid = (Mervid) connection.getApi();
		
		String randomUsername = RandomStringUtils.randomAlphanumeric(6);
		
		User user = mervid.userOperations().getUser();
		user.setId(null);
		user.setAddress(new Address());
		user.setLogInformation(new LogInformation());
		user.setFileInfo(null);
		
		user.setUsername(StringUtils.join(user.getName().getFirst(), user.getName().getLast(), randomUsername));
		user.setPassword(RandomStringUtils.randomAlphanumeric(8));
		
		return user;
	}
}
