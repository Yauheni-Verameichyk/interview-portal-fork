package by.interview.portal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.NamedAttributeNode;
import javax.persistence.NamedEntityGraph;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Entity
@Table(name = "candidates")
@NamedEntityGraph(name = "Candidate.disciplineList",
        attributeNodes = {@NamedAttributeNode("disciplineList")})
public class Candidate extends Person {

    @ManyToMany
    @JoinTable(name = "candidate_discipline", joinColumns = @JoinColumn(name = "candidate_id"),
            inverseJoinColumns = @JoinColumn(name = "discipline_id"))
    @LazyCollection(LazyCollectionOption.TRUE)
    private Set<Discipline> disciplineList;
    @OneToMany(cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.TRUE)
    @JoinColumn(name = "candidate_id")
    private List<CandidateWork> candidateWorkList;

    @OneToMany(cascade = CascadeType.ALL)
    @LazyCollection(LazyCollectionOption.TRUE)
    @JoinColumn(name = "candidate_id")
    private List<CandidateEducation> candidateEducationList;

    public Candidate(Long id, String name, String email, String surname, String phoneNumber,
            Set<Discipline> disciplineList, List<CandidateWork> candidateWorkList,
            List<CandidateEducation> candidateEducationList) {
        super(id, email, name, surname, phoneNumber);
        this.disciplineList = disciplineList;
        this.candidateWorkList = candidateWorkList;
        this.candidateEducationList = candidateEducationList;
    }

}
