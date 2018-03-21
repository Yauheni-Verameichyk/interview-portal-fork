package by.interview.portal.domain;

import java.time.LocalDateTime;
import java.time.temporal.TemporalAmount;
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
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "specified_time")
public class SpecifiedTime {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false, columnDefinition = "bigserial")
    private Long id;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "repeat_interval", columnDefinition = "interval")
    private TemporalAmount repeatInterval;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany
    @JoinTable(name = "interview_specified_time",
            joinColumns = {@JoinColumn(name = "specified_time_id")},
            inverseJoinColumns = {@JoinColumn(name = "interview_id")})
    private Set<Interview> interviewsSet;
}
