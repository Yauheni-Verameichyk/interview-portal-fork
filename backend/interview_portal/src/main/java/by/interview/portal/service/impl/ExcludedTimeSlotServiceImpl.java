package by.interview.portal.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import by.interview.portal.domain.ExcludedTimeSlot;
import by.interview.portal.repository.ExcludedTimeSlotRepository;
import by.interview.portal.repository.UserRepository;
import by.interview.portal.service.ExcludedTimeSlotService;
import by.interview.portal.utils.UserUtils;

@Service
public class ExcludedTimeSlotServiceImpl implements ExcludedTimeSlotService {

    @Autowired
    private ExcludedTimeSlotRepository excludedTimeSlotRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<ExcludedTimeSlot> findByStartTimeBetween(LocalDateTime rangeStart,
            LocalDateTime rangeEnd) {
        return excludedTimeSlotRepository.findByStartTimeBetweenAndUser(rangeStart, rangeEnd,
                userRepository.findFirstByLogin(UserUtils.getCurrentUsersUsername()));
    }

    @Override
    public void save(ExcludedTimeSlot excludedTimeSlot) {
        excludedTimeSlot
                .setUser(userRepository.findFirstByLogin(UserUtils.getCurrentUsersUsername()));
        excludedTimeSlotRepository.save(excludedTimeSlot);
    }
}
