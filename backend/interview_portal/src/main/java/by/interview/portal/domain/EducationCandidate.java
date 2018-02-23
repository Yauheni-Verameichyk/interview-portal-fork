package by.interview.portal.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)

@Entity
@Table(name = "education_candidate")
public class EducationCandidate extends DateInterval{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name_institution")
    private String nameInstitution;
    private String profession;

    public EducationCandidate(Long id, String nameInstitution, String profession, Date dateStart, Date dateEnd) {
        this(id, nameInstitution, profession);
        this.setDateEnd(dateEnd);
        this.setDateStart(dateStart);
    }

}
