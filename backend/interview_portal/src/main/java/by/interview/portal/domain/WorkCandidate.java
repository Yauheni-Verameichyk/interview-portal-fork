package by.interview.portal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

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
    private String companyName;
    private String position;

    public WorkCandidate(Long id, String nameCompany, String position, Date dateStart, Date dateEnd) {
        this(id, nameCompany, position);
        this.setEndDate(dateEnd);
        this.setStartDate(dateStart);
    }


}
