package by.interview.portal.dto;

import java.util.Set;

import by.interview.portal.domain.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DisciplineDTO {

    private long id;

    private String name;

    private String subscription;

    private Long parentId;

    private Set<User> disciplineHeadsList;
}
