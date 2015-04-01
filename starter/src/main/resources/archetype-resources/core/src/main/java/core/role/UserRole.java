#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.core.role;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import ${package}.core.DefaultPersistence;
import ${package}.core.user.User;


@Entity
@Table(name = "${parentArtifactId}_user_role", uniqueConstraints = @UniqueConstraint(columnNames = { "role_id", "user_id" }))
public class UserRole extends DefaultPersistence {
	private Role role = new Role();
	private User user = new User();
	
	public UserRole() {}

	public UserRole(Role role, User user) {
		this.role = role;
		this.user = user;
	}

	@ManyToOne
	@JoinColumn(name = "role_id", nullable = false)
	public Role getRole() {
		return role;
	}
	
	public void setRole(Role role) {
		this.role = role;
	}

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
}
