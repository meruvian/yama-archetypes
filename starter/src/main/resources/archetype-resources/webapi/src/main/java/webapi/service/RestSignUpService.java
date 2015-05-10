#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.webapi.service;

import java.io.IOException;

import javax.inject.Inject;

import ${package}.core.commons.FileInfo;
import ${package}.core.role.Role;
import ${package}.core.role.RoleRepository;
import ${package}.core.user.User;
import ${package}.social.core.SocialService;
import ${package}.social.core.SocialServiceLocator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.social.connect.Connection;
import org.springframework.social.connect.ConnectionSignUp;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RestSignUpService implements SignUpService, ConnectionSignUp, EnvironmentAware {
	private static final Logger LOG = LoggerFactory.getLogger(RestSignUpService.class);
	
	@Inject
	private SocialServiceLocator socialServiceLocator;
	
	@Inject
	private UserService userService;
	
	@Inject
	private RoleRepository roleRepository;
	
	private String defaultRole;
	
	@Override
	@Transactional
	public User signUp(User user) {
		return userService.saveUser(user);
	}

	@Override
	@Transactional
	public String execute(Connection<?> connection) {
		SocialService<?> socialService = socialServiceLocator.getSocialService(connection.getKey().getProviderId());
		User createdUser = socialService.createUser(connection);
		User user = userService.getUserByUsernameOrId(createdUser.getEmail());
		FileInfo fileInfo = createdUser.getFileInfo();
		
		if (user != null) {
			createdUser = user;
		} else {
			createdUser.setFileInfo(null);
			createdUser = userService.saveUser(createdUser);
			
			Role role = roleRepository.findByName(defaultRole);
			if (role != null) {
				userService.addRoleToUser(createdUser.getId(), role.getId());
			}
		}
		
		if (fileInfo != null) {
			try {
				userService.updateUserPhoto(createdUser.getId(), fileInfo.getDataBlob());
			} catch (IOException e) {
				LOG.error(e.getMessage(), e);
			}
		}
		
		return createdUser.getId();
	}

	@Override
	public void setEnvironment(Environment environment) {
		this.defaultRole = environment.getProperty("default.role");
	}
}
