package by.interview.portal.dto;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FullUserInfoDTO {

    private Long id;

    private String name;

    private String email;

    private String surname;

    private String login;

    private String phoneNumber;

    private Map<Role, List<Discipline>> roleDisciplines;

}
