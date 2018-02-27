package by.interview.portal.dto;

import by.interview.portal.domain.Role;
import lombok.Data;

import java.util.Set;

@Data
public class UserBaseInfoDTO {

    private Long id;

    private String name;

    private String surname;

    private Set<Role> roles;


}
