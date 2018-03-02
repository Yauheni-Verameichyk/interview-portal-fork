package by.interview.portal.dto;

import java.util.Set;

import by.interview.portal.domain.Role;
import lombok.Data;

@Data
public class UserBaseInfoDTO {

    private Long id;

    private String name;

    private String surname;

    private Set<Role> roles;


}
