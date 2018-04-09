package by.interview.portal.facade;

import java.time.LocalDateTime;

import by.interview.portal.dto.CalendarDTO;

public interface CalendarFacade {

    CalendarDTO findAllForUserInRange(LocalDateTime rangeStart, LocalDateTime rangeEnd);
}
