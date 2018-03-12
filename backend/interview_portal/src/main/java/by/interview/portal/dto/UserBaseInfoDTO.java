package by.interview.portal.dto;

import java.util.Set;

import by.interview.portal.domain.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserBaseInfoDTO {

    private Long id;

    private String name;

    private String surname;

    private Set<Role> roles;


}
