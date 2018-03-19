package by.interview.portal.service;

import by.interview.portal.domain.Candidate;

import java.util.List;

public interface CandidateService {

    List<Candidate> findAll(Integer page);

    void add(Candidate candidate);

    Candidate findById(Long id);

    void update(Candidate candidate);

    void delete(Long id);
}
