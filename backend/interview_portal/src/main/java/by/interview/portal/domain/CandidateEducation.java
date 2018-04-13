package by.interview.portal.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
@Entity
@Table(name = "education_candidate")
public class CandidateEducation extends DateInterval {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name_institution")
    private String nameInstitution;
    private String profession;

    public CandidateEducation(Long id, String nameInstitution, String profession, Date dateStart,
            Date dateEnd) {
        this(id, nameInstitution, profession);
        setEndDate(dateEnd);
        setStartDate(dateStart);
    }
}
