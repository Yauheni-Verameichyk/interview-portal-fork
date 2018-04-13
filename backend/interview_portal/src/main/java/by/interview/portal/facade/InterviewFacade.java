package by.interview.portal.facade;

import by.interview.portal.dto.FullInterviewInfoDTO;
import by.interview.portal.dto.InterviewDTO;

import java.util.List;

public interface InterviewFacade {

    List<InterviewDTO> findAll(Integer quantity);

    FullInterviewInfoDTO findById(Long id);

    void add(FullInterviewInfoDTO interview);

    void update(FullInterviewInfoDTO interview);

    void delete(Long id);
}
