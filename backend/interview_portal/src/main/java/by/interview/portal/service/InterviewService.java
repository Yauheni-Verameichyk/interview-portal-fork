package by.interview.portal.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import by.interview.portal.domain.Interview;

public interface InterviewService {

    List<Interview> findAll(Integer quantity);

    Interview findById(Long id);

    Set<Interview> findByStartTimeBetween(LocalDateTime rangeStart, LocalDateTime rangeEnd);

    void add(Interview interview);

    void update(Interview interview);

    void delete(Long id);
}
