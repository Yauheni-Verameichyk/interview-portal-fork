package by.interview.portal.dto;

import java.util.List;
import java.util.Map;
import java.util.Set;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import lombok.Data;

@Data
public class FullUserInfoDTO {

    private Long id;

    private String name;

    private String surname;

    private String login;

    private Set<Role> roles;

    private String phoneNumber;

    private Map<Role, List<Discipline>> roleDisciplines;

}
