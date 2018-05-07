package by.interview.portal.facade;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import by.interview.portal.dto.FullInterviewInfoDTO;
import by.interview.portal.dto.InterviewDTO;

public interface InterviewFacade {

    List<InterviewDTO> findAll(Integer quantity);

    FullInterviewInfoDTO findById(Long id);

    Set<InterviewDTO> findByStartTimeBetween(LocalDateTime rangeStart, LocalDateTime rangeEnd);

    void add(FullInterviewInfoDTO interview);

    void update(FullInterviewInfoDTO interview);

    void delete(Long id);
}
