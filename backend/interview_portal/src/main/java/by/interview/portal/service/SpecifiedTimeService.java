package by.interview.portal.service;

import java.time.LocalDateTime;
import java.util.List;

import by.interview.portal.domain.SpecifiedTime;

public interface SpecifiedTimeService {

    List<SpecifiedTime> findAllInRange(LocalDateTime rangeStart, LocalDateTime rangeEnd,
            Long disciplineId);

    List<SpecifiedTime> findAllForUserInRange(LocalDateTime rangeStart, LocalDateTime rangeEnd);
}
