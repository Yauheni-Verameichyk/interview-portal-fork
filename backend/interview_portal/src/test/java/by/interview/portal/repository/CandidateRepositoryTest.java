package by.interview.portal.repository;

import by.interview.portal.config.TestRepositoryConfig;
import by.interview.portal.domain.Candidate;
import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.EducationCandidate;
import by.interview.portal.domain.WorkCandidate;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = { TestRepositoryConfig.class })
@Transactional
public class CandidateRepositoryTest {

	@Autowired
	private EntityManager entityManager;

	@Autowired
	private CandidateRepository candidateRepository;

	@Autowired
	private DisciplineRepository disciplineRepository;

	@Test
	public void findByDisciplineTest() {
		Discipline discipline = new Discipline(1L, "Java", "Best of the best language!!!", null);
		List<Discipline> disciplineList = new ArrayList<>();
		disciplineList.add(entityManager.merge(discipline));
		Candidate candidate = new Candidate(5L, "Viktar", "Hrynko", "+12312312312", disciplineList,
				new ArrayList<WorkCandidate>(), new ArrayList<EducationCandidate>());
		List<Candidate> candidateList = new ArrayList<>();
		candidateList.add(candidate);
		List<Candidate> newCandidateList = candidateRepository.findByDiscipline(discipline);
		Assert.assertTrue(newCandidateList.containsAll(candidateList));
		Assert.assertTrue(candidateList.size() == newCandidateList.size());
	}

}
