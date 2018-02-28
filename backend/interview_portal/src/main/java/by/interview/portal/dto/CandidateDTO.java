package by.interview.portal.dto;

import java.util.List;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Person;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class CandidateDTO extends Person {

	private List<Discipline> disciplineList;

}
