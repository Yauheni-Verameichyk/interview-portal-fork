package by.interview.portal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "education_candidate")
public class EducationCandidate extends DateInterval{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name_institution")
    private String nameInstitution;
    private String profession;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

}
