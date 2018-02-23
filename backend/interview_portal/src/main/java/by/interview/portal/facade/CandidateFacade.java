package by.interview.portal.facade;

import by.interview.portal.domain.Candidate;
import by.interview.portal.dto.CandidateDTO;
import by.interview.portal.dto.ListBean;

public interface CandidateFacade {

    ListBean<CandidateDTO> findPage(Integer page);

}
