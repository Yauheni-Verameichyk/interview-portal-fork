package by.interview.portal.dto;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Person;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class CandidateDTO extends Person {

    private Set<Discipline> disciplineList;

    public CandidateDTO(Long id, String name, String email, String surname, String phoneNumber,
            Set<Discipline> disciplineList) {
        super(id, email, name, surname, phoneNumber);
        this.disciplineList = disciplineList;
    }
}
