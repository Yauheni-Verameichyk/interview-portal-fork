package by.interview.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;

@Data
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
}
