package by.interview.portal.repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.EntityManager;

import by.interview.portal.domain.CandidateEducation;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import by.interview.portal.config.TestRepositoryConfig;
import by.interview.portal.domain.Candidate;
import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.CandidateWork;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {TestRepositoryConfig.class})
@Transactional
public class CandidateRepositoryTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private CandidateRepository candidateRepository;

    private List<Candidate> candidateList;

    private Discipline discipline;

    @Before
    public void doSetup() {
        discipline = new Discipline(1L, "Java", "Best of the best language!!!", null);
        discipline = entityManager.merge(discipline);
        Candidate candidate = new Candidate(5L, "Viktar", "Hrynko", "+12312312312",
            Stream.of(discipline).collect(Collectors.toSet()),
            new ArrayList<CandidateWork>(),
            new ArrayList<CandidateEducation>());
        candidateList = Arrays.asList(candidate);
    }

    @Test
    public void shouldReturnCandidateListByDiscipline() {
        List<Candidate> newCandidateList = candidateRepository.findByDiscipline(discipline);
        Assert.assertTrue(newCandidateList.containsAll(candidateList));
        Assert.assertTrue(candidateList.size() == newCandidateList.size());
    }

}
