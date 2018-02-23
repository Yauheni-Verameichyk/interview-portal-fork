package by.interview.portal.service.impl;

import by.interview.portal.domain.Candidate;
import by.interview.portal.repository.CandidateRepository;
import by.interview.portal.repository.DisciplineRepository;
import by.interview.portal.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CandidateServiceImpl implements CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;
    @Autowired
    private DisciplineRepository disciplineRepository;

    public static final int  COUNT_ELEMENTS_IN_PAGE = 10;

    @Override
    public Page<Candidate> findPage(Integer page) {
       return candidateRepository.findAll(PageRequest.of(page-1, COUNT_ELEMENTS_IN_PAGE));
    }

}
