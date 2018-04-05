package by.interview.portal.facade.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import by.interview.portal.domain.ExcludedTimeSlot;
import by.interview.portal.facade.ExcludedTimeSlotFacade;
import by.interview.portal.service.ExcludedTimeSlotService;

@Service
public class ExcludedTimeSlotFacadeImpl implements ExcludedTimeSlotFacade {

    @Autowired
    private ExcludedTimeSlotService excludedTimeSlotService;

    @Override
    public List<ExcludedTimeSlot> findByStartTimeBetween(LocalDateTime rangeStart,
            LocalDateTime rangeEnd) {
        return excludedTimeSlotService.findByStartTimeBetween(rangeStart, rangeEnd);
    }

    @Override
    public void save(ExcludedTimeSlot excludedTimeSlot) {
        excludedTimeSlotService.save(excludedTimeSlot);
    }
}
