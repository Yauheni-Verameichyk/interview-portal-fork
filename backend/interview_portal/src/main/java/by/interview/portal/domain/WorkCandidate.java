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
@Table(name = "work_candidate")
public class WorkCandidate extends DateInterval{

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name_company")
    private String nameCompany;
    private String position;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

}
