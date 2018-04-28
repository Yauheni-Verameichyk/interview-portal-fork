package by.interview.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

import by.interview.portal.domain.ExcludedTimeSlot;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarDTO {

    private List<SpecifiedTimeDTO> specifiedTimeDTOs;

    private List<ExcludedTimeSlot> excludedTimeSlots;

    private Set<InterviewDTO> interviews;
}
