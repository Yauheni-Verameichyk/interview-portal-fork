package by.interview.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.Period;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecifiedTimeDTO {

    private Long id;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Period repeatInterval;

    private UserBaseInfoDTO user;

    private Integer duration;

    private Long groupId;
}
