package by.interview.portal.facade;

import java.util.List;

import by.interview.portal.dto.CandidateDTO;

public interface CandidateFacade {

    List<CandidateDTO> findAll(Integer quantity);

}
