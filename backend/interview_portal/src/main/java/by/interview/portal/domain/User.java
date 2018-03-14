package by.interview.portal.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Entity
@Table(name = "users")
public class User extends Person {

	@Column(name = "login", unique = true, nullable = false, length = 50)
	private String login;

	@Column(name = "password", nullable = false, length = 100)
	private String password;

	@Column(name = "phone_number", nullable = false, length = 50)
	private String phoneNumber;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<UserRoleDiscipline> userRoleDisciplines;
}
