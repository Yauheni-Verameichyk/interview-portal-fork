package by.interview.portal.facade;

import by.interview.portal.dto.CandidateDTO;

import java.util.List;

public interface CandidateFacade {

    List<CandidateDTO> findAll(Integer quantity);

}
