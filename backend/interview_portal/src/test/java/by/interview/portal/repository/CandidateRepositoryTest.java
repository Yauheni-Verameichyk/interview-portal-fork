package by.interview.portal.repository;

import static org.junit.Assert.assertTrue;

import by.interview.portal.config.TestRepositoryConfig;
import by.interview.portal.domain.Candidate;
import by.interview.portal.domain.CandidateEducation;
import by.interview.portal.domain.CandidateWork;
import by.interview.portal.domain.Discipline;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import javax.persistence.EntityManager;

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
        Candidate candidate = new Candidate(5L, "Viktar", "Hrynko", "mail@mail.ru", "+12312312312",
                Stream.of(discipline).collect(Collectors.toSet()), new ArrayList<CandidateWork>(),
                new ArrayList<CandidateEducation>());
        candidateList = Arrays.asList(candidate);
    }

    @Test
    public void shouldReturnCandidateListByDiscipline() {
        List<Candidate> newCandidateList = candidateRepository.findByDiscipline(discipline);
        assertTrue(newCandidateList.containsAll(candidateList));
        assertTrue(candidateList.size() == newCandidateList.size());
    }

    @Test
    public void shouldRemoveCandidateById() {
        candidateRepository.deleteById(6L);
        candidateRepository.deleteById(8L);
        candidateRepository.deleteById(9L);
        candidateRepository.deleteById(10L);
        List<Candidate> newCandidateList = candidateRepository.findAll();
        assertTrue(newCandidateList.containsAll(candidateList));
    }

}
