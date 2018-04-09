package by.interview.portal.facade.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import by.interview.portal.dto.CalendarDTO;
import by.interview.portal.facade.CalendarFacade;
import by.interview.portal.facade.SpecifiedTimeFacade;
import by.interview.portal.service.ExcludedTimeSlotService;

@Service
public class CalendarFacadeImpl implements CalendarFacade {

    @Autowired
    private ExcludedTimeSlotService excludedTimeSlotService;

    @Autowired
    private SpecifiedTimeFacade specifiedTimeFacade;

    @Override
    public CalendarDTO findAllForUserInRange(LocalDateTime rangeStart, LocalDateTime rangeEnd) {
        CalendarDTO calendarDTO = new CalendarDTO();
        calendarDTO.setSpecifiedTimeDTOs(
                specifiedTimeFacade.findAllForUserInRange(rangeStart, rangeEnd));
        calendarDTO.setExcludedTimeSlots(
                excludedTimeSlotService.findByStartTimeBetween(rangeStart, rangeEnd));
        return calendarDTO;
    }
}
