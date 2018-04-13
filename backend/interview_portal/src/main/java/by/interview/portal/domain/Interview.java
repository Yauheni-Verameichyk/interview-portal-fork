package by.interview.portal.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "interviews")
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", columnDefinition = "bigserial")
    private Long id;

    @Column(name = "description", length = 200)
    private String description;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

    private String place;

    @Column(name = "final_mark")
    private Byte finalMark;

    private String feedback;

    private String status;

    @ManyToMany
    @JoinTable(name = "interviews_users", joinColumns = {@JoinColumn(name = "interview_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")})
    private Set<User> interviewerSet;

    @ManyToMany
    @JoinTable(name = "interview_discipline", joinColumns = {@JoinColumn(name = "interview_id")},
            inverseJoinColumns = {@JoinColumn(name = "discipline_id")})
    private Set<Discipline> disciplineSet;

    @OneToMany
    @JoinColumn(name = "interview_id")
    private List<DisciplineMark> markList;

}
