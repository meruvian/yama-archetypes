#set( $symbol_pound = '#' )
#set( $symbol_dollar = '$' )
#set( $symbol_escape = '\' )

package ${package}.web.security.oauth;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

import ${package}.core.DefaultPersistence;
import ${package}.core.application.Application;


@Entity
@Table(name = "${parentArtifactId}_oauth_application_approval", uniqueConstraints = { @UniqueConstraint(columnNames = {"application_id", "create_by", "scope"}) })
public class OauthApplicationApproval extends DefaultPersistence {
	public enum ApprovalStatus {
		APPROVED, DENIED;
	}
	
	private Application application;
	private String scope;
	private ApprovalStatus status = ApprovalStatus.APPROVED;
	private Date expiresAt;

	@ManyToOne
	@JoinColumn(name = "application_id")
	public Application getApplication() {
		return application;
	}
	
	public void setApplication(Application application) {
		this.application = application;
	}

	public String getScope() {
		return scope;
	}
	
	public void setScope(String scope) {
		this.scope = scope;
	}

	@Enumerated(EnumType.STRING)
	public ApprovalStatus getStatus() {
		return status;
	}
	
	public void setStatus(ApprovalStatus status) {
		this.status = status;
	}

	@Column(name = "expires_at")
	public Date getExpiresAt() {
		return expiresAt;
	}
	
	public void setExpiresAt(Date expiresAt) {
		this.expiresAt = expiresAt;
	}
}
