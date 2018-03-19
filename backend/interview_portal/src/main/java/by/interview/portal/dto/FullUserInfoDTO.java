package by.interview.portal.dto;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
public class FullUserInfoDTO {

    private Long id;

    private String name;

    private String surname;

    private String login;

    private String phoneNumber;

    private Map<Role, List<Discipline>> roleDisciplines;

}
