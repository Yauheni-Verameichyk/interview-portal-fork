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
@Table(name = "work_candidate")
public class WorkCandidate extends DateInterval{

    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name_company")
    private String nameCompany;
    private String position;

    public WorkCandidate(Long id, String nameCompany, String position, Date dateStart, Date dateEnd) {
        this(id, nameCompany, position);
        this.setDateEnd(dateEnd);
        this.setDateStart(dateStart);
    }


}
