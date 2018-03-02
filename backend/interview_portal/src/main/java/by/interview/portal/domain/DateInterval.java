package by.interview.portal.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class DateInterval {

    @Column(name = "date_start")
    private Date startDate;

    @Column(name = "date_End")
    private Date endDate;

}
