package by.interview.portal.service;

import by.interview.portal.domain.Candidate;
import by.interview.portal.dto.ListBean;
import org.springframework.data.domain.Page;

import java.util.List;

public interface CandidateService {

    Page<Candidate> findPage(Integer page);

    void add(Candidate candidate);

}
