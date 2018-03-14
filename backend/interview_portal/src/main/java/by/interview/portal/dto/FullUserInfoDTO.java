package by.interview.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.Set;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;

@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class FullUserInfoDTO {

    private Long id;

    private String name;

    private String surname;

    private String login;

    private Set<Role> roles;

    private String phoneNumber;

    private Map<Role, List<Discipline>> roleDisciplines;

}
