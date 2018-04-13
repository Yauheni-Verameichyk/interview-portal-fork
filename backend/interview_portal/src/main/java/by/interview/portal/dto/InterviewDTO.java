package by.interview.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InterviewDTO {

    private Long id;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private CandidateBaseInfoDTO candidate;

    private String place;

    private String status;

    private Set<UserBaseInfoDTO> interviewerSet;

    private Set<DisciplineBaseInfoDTO> disciplineSet;

}
