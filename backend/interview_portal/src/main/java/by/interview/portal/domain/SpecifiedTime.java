package by.interview.portal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.Period;
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

import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import by.interview.portal.utils.Interval;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "specified_time")
@TypeDef(name = "interval", typeClass = Interval.class)
public class SpecifiedTime {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false, columnDefinition = "bigserial")
    private Long id;

    @Column(name = "start_time")
    private LocalDateTime startTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

    @Column(name = "repeat_interval", columnDefinition = "interval")
    @Type(type = "interval")
    private Period repeatInterval;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "group_id")
    private Long groupId;

    @ManyToMany
    @JoinTable(name = "interview_specified_time",
            joinColumns = {@JoinColumn(name = "specified_time_id")},
            inverseJoinColumns = {@JoinColumn(name = "interview_id")})
    private Set<Interview> interviewsSet;

}
