package by.interview.portal.dto;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Person;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateDTO extends Person{

    private List<Discipline> disciplineList;

}
