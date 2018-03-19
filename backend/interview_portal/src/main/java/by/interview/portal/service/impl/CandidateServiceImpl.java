package by.interview.portal.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import by.interview.portal.repository.CandidateEducationRepository;
import by.interview.portal.repository.CandidateWorkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.interview.portal.domain.Candidate;
import by.interview.portal.domain.Discipline;
import by.interview.portal.repository.CandidateRepository;
import by.interview.portal.repository.DisciplineRepository;
import by.interview.portal.service.CandidateService;

@Service
@Transactional
public class CandidateServiceImpl implements CandidateService {

    private static final Integer QUANTITY_ELEMENTS_IN_PAGE = 10;
    @Autowired
    private CandidateRepository candidateRepository;
    @Autowired
    private DisciplineRepository disciplineRepository;
    @Autowired
    private CandidateEducationRepository candidateEducationRepository;
    @Autowired
    private CandidateWorkRepository candidateWorkRepository;

    @Override
    public List<Candidate> findAll(Integer quantity) {
        Integer page =
                (int) Math.ceil(quantity.doubleValue() / QUANTITY_ELEMENTS_IN_PAGE.doubleValue());
        return candidateRepository.findAll(PageRequest.of(page, QUANTITY_ELEMENTS_IN_PAGE))
                .getContent();
    }

    @Override
    public void add(Candidate candidate) {
        candidate.setDisciplineList(persistDisciplineList(candidate));
        candidateRepository.saveAndFlush(candidate);
    }

    @Override
    public Candidate findById(Long id) {
        return candidateRepository.findById(id).get();
    }

    @Override
    public void update(Candidate candidate) {
        candidate.setDisciplineList(persistDisciplineList(candidate));
        candidateRepository.saveAndFlush(candidate);
        candidateEducationRepository.removeEducation();
        candidateWorkRepository.removeWork();
    }

    @Override public void delete(Long id) {
        candidateRepository.deleteById(id);
    }

    private Set<Discipline> persistDisciplineList(Candidate candidate) {
        return candidate.getDisciplineList().stream().filter(Objects::nonNull)
                .map(discipline -> disciplineRepository.findById(discipline.getId()).get())
                .collect(Collectors.toSet());
    }
}
