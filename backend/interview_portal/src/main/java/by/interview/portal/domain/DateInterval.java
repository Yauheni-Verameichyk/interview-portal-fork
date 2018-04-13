package by.interview.portal.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
