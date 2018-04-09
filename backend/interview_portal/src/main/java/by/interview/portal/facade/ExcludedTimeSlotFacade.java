package by.interview.portal.facade;

import java.time.LocalDateTime;
import java.util.List;

import by.interview.portal.domain.ExcludedTimeSlot;

public interface ExcludedTimeSlotFacade {

    List<ExcludedTimeSlot> findByStartTimeBetween(LocalDateTime rangeStart, LocalDateTime rangeEnd);

    void save(ExcludedTimeSlot excludedTimeSlot);
}
