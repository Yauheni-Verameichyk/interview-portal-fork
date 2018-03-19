package by.interview.portal.repository;

import by.interview.portal.config.TestRepositoryConfig;
import by.interview.portal.domain.CandidateWork;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.Arrays;
import java.util.List;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {TestRepositoryConfig.class})
@Transactional
public class CandidateWorkRepositoryTest {

    @Autowired
    private CandidateWorkRepository repository;

    private List<CandidateWork> candidateWorkList;

    @Before
    public void doSetup() {
        CandidateWork candidateWork = new CandidateWork(2L,  "Integral", "accountant",null, null);
        CandidateWork secondCandidateWork = new CandidateWork(7L,  "MTZ", "manager",null, null);
        candidateWorkList = Arrays.asList(candidateWork, secondCandidateWork);
    }

    @Test
    public void shouldRemoveCandidateWorkWithOutCandidate() {
        repository.removeWork();
        List<CandidateWork> newCandidateWorkList = repository.findAll();
        assertNotNull(newCandidateWorkList);
        assertThat(newCandidateWorkList.size(), equalTo(2));
        assertThat(newCandidateWorkList, equalTo(candidateWorkList));
    }
}
