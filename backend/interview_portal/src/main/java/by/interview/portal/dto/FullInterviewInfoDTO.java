package by.interview.portal.dto;

import by.interview.portal.domain.DisciplineMark;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FullInterviewInfoDTO {

    private Long id;

    private String description;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private CandidateBaseInfoDTO candidate;

    private String place;

    private Byte finalMark;

    private String feedback;

    private String status;

    private Set<UserBaseInfoDTO> interviewerSet;

    private Set<DisciplineBaseInfoDTO> disciplineSet;

    private List<DisciplineMark> markList;

}
