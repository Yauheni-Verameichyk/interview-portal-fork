package by.interview.portal.service.impl;

import by.interview.portal.domain.Candidate;
import by.interview.portal.domain.Discipline;
import by.interview.portal.repository.CandidateRepository;
import by.interview.portal.repository.DisciplineRepository;
import by.interview.portal.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
public class CandidateServiceImpl implements CandidateService {

    @Autowired
    private CandidateRepository candidateRepository;
    @Autowired
    private DisciplineRepository disciplineRepository;

    private static final Integer  QUANTITY_ELEMENTS_IN_PAGE = 10;

    @Override
    public List<Candidate> findAll(Integer quantity) {
        Integer page = (int) Math.ceil(quantity.doubleValue()/QUANTITY_ELEMENTS_IN_PAGE.doubleValue());
        return candidateRepository.findAll(PageRequest.of(page, QUANTITY_ELEMENTS_IN_PAGE)).getContent();
    }

    @Override
    public void add(Candidate candidate) {
        List<Discipline> disciplineList = candidate.getDisciplineList().stream()
                .filter(Objects::nonNull)
                .map(discipline ->
                        disciplineRepository.findById(discipline.getId()).get())
                .collect(Collectors.toList());
        candidate.setDisciplineList(disciplineList);
        candidateRepository.saveAndFlush(candidate);
    }

}
