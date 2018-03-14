package by.interview.portal.domain;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Entity
@Table(name = "candidates")
public class Candidate extends Person {

	@ManyToMany
	@JoinTable(name = "candidate_discipline", joinColumns = @JoinColumn(name = "candidate_id"), inverseJoinColumns = @JoinColumn(name = "discipline_id"))
	@LazyCollection(LazyCollectionOption.TRUE)
	private List<Discipline> disciplineList;
	@OneToMany(cascade = CascadeType.ALL)
	@LazyCollection(LazyCollectionOption.TRUE)
	@JoinColumn(name = "candidate_id")
	private List<WorkCandidate> workCandidateList;

	@OneToMany(cascade = CascadeType.ALL)
	@LazyCollection(LazyCollectionOption.TRUE)
	@JoinColumn(name = "candidate_id")
	private List<EducationCandidate> educationCandidateList;

	public Candidate(Long id, String name, String surname, String phoneNumber, List<Discipline> disciplineList,
			List<WorkCandidate> workCandidateList, List<EducationCandidate> educationCandidateList) {
		super(id, name, surname, phoneNumber);
		this.disciplineList = disciplineList;
		this.workCandidateList = workCandidateList;
		this.educationCandidateList = educationCandidateList;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		if (!super.equals(o))
			return false;

		Candidate candidate = (Candidate) o;

		if (disciplineList != null ? !disciplineList.equals(candidate.disciplineList)
				: candidate.disciplineList != null)
			return false;
		if (workCandidateList != null ? !workCandidateList.equals(candidate.workCandidateList)
				: candidate.workCandidateList != null)
			return false;
		return educationCandidateList != null ? educationCandidateList.equals(candidate.educationCandidateList)
				: candidate.educationCandidateList == null;
	}

	@Override
	public int hashCode() {
		int result = super.hashCode();
		result = 31 * result + (disciplineList != null ? disciplineList.hashCode() : 0);
		result = 31 * result + (workCandidateList != null ? workCandidateList.hashCode() : 0);
		result = 31 * result + (educationCandidateList != null ? educationCandidateList.hashCode() : 0);
		return result;
	}
}
