package by.interview.portal.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "roles_disciplines_permissions")
public class RoleDisciplinePermission {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	@Column(name = "id", nullable = false, columnDefinition = "bigserial")
	private Long id;

	@Enumerated(EnumType.ORDINAL)
	@Column(name = "role_id", nullable = false)
	private Role role;

	@ManyToOne
	@JoinColumn(name = "discipline_id", nullable = true)
	private Discipline discipline;

	@ManyToOne
	@JoinColumn(name = "permission_id")
	private Permission permission;
}
