package by.interview.portal.domain;

import java.util.Set;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "permission_templates")
public class PermissionTemplate {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id", nullable = false, columnDefinition = "bigserial")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "name_id")
	private PermissionName name;

	@ManyToOne
	@JoinColumn(name = "operation_id")
	private Operation operation;

	@Column(name = "is_discipline_name_required")
	private boolean isDisciplineNameRequired;

	@ElementCollection(fetch = FetchType.LAZY, targetClass = Role.class)
	@CollectionTable(name = "roles_permissions", joinColumns = @JoinColumn(name = "permission_id"))
	@Column(name = "role_id")
	private Set<Role> roles;
}
