package by.interview.portal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import by.interview.portal.domain.ExcludedTimeSlot;
import by.interview.portal.domain.Interview;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CalendarDTO {

    private List<SpecifiedTimeDTO> specifiedTimeDTOs;

    private List<ExcludedTimeSlot> excludedTimeSlots;

    private List<Interview> interviews;
}
