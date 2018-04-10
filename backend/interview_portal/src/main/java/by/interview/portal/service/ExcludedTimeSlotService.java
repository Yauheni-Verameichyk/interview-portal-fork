package by.interview.portal.service;

import java.time.LocalDateTime;
import java.util.List;

import by.interview.portal.domain.ExcludedTimeSlot;

public interface ExcludedTimeSlotService {

    List<ExcludedTimeSlot> findByStartTimeBetween(LocalDateTime rangeStart, LocalDateTime rangeEnd);

    void save(ExcludedTimeSlot excludedTimeSlot);

    void deleteById(Long id);
}
