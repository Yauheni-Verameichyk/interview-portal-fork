package by.interview.portal.dto;

import java.util.Set;

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

    private String parentName;

    private Set<UserBaseInfoDTO> disciplineHeadsList;
}
