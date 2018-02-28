package by.interview.portal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.JoinTable;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)

@Entity
@Table(name = "candidates")
public class Candidate extends Person{

    @ManyToMany(cascade= CascadeType.ALL)
    @JoinTable(name = "candidate_discipline", joinColumns = @JoinColumn(name = "candidate_id"),
            inverseJoinColumns = @JoinColumn(name = "discipline_id"))
    @LazyCollection(LazyCollectionOption.TRUE)
    private List<Discipline> disciplineList;
    @OneToMany(cascade=CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.TRUE)
    @JoinColumn(name = "candidate_id")
    private List<WorkCandidate> workCandidateList;

    @OneToMany(cascade=CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.TRUE)
    @JoinColumn(name = "candidate_id")
    private List<EducationCandidate> educationCandidateList;

    public Candidate(Long id, String name, String surname, String phoneNumber, List<Discipline> disciplineList, List<WorkCandidate> workCandidateList, List<EducationCandidate> educationCandidateList) {
        super(id, name, surname, phoneNumber);
        this.disciplineList = disciplineList;
        this.workCandidateList = workCandidateList;
        this.educationCandidateList = educationCandidateList;
    }
}
