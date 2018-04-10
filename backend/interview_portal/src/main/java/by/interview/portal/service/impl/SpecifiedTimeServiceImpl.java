package by.interview.portal.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.interview.portal.domain.SpecifiedTime;
import by.interview.portal.repository.SpecifiedTimeRepository;
import by.interview.portal.service.SpecifiedTimeService;
import by.interview.portal.utils.UserUtils;

@Service
@Transactional
public class SpecifiedTimeServiceImpl implements SpecifiedTimeService {

    @Autowired
    private SpecifiedTimeRepository specifiedTimeRepository;

    @Override
    public List<SpecifiedTime> findAllInRange(LocalDateTime rangeStart, LocalDateTime rangeEnd,
            Long disciplineId) {
        return specifiedTimeRepository.findAllInRange(rangeStart, rangeEnd, disciplineId);
    }

    @Override
    public List<SpecifiedTime> findAllForUserInRange(LocalDateTime rangeStart,
            LocalDateTime rangeEnd) {
        return specifiedTimeRepository.findAllForUserInRange(rangeStart, rangeEnd,
                UserUtils.getCurrentUsersUsername());
    }

    @Override
    public void save(SpecifiedTime specifiedTime) {
        specifiedTimeRepository.save(specifiedTime);
    }

    @Override
    public SpecifiedTime findById(Long id) {
        return specifiedTimeRepository.findById(id).get();
    }

    @Override
    public void deleteById(Long id) {
        specifiedTimeRepository.deleteById(id);
    }

    @Override
    public void deleteByGroupId(Long id) {
        specifiedTimeRepository.deleteByGroupId(id);
    }
}
