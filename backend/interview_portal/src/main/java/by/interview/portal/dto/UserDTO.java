package by.interview.portal.dto;

import java.util.List;
import java.util.Map;
import java.util.Set;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
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
public class UserDTO {

	private Long id;

	private String name;

	private String surname;

	private String password;

	private String phoneNumber;

	private String login;

	private Map<Role, List<Discipline>> roleDisciplines;

	private Set<String> permissions;
}
