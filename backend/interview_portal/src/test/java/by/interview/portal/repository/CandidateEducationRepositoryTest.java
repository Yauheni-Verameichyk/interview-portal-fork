package by.interview.portal.repository;

import by.interview.portal.config.TestRepositoryConfig;
import by.interview.portal.domain.CandidateEducation;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import static org.hamcrest.Matchers.equalTo;
import static org.junit.Assert.assertThat;

import java.util.Arrays;
import java.util.List;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {TestRepositoryConfig.class})
@Transactional
public class CandidateEducationRepositoryTest {

    @Autowired
    private CandidateEducationRepository repository;

    private List<CandidateEducation> candidateEducationList;

    @Before
    public void doSetup() {
        CandidateEducation candidateEducation =
                new CandidateEducation(12L, "PSU", "Radio-Technical");
        CandidateEducation secondCandidateEducation = new CandidateEducation(13L, "PSU", "IT");
        candidateEducationList = Arrays.asList(candidateEducation, secondCandidateEducation);

    }

    @Test
    public void shouldRemoteEducationWithoutCandidate() {
        repository.removeEducation();
        List<CandidateEducation> newCandidateEducations = repository.findAll();
        Assert.assertNotNull(newCandidateEducations);
        assertThat(newCandidateEducations.size(), equalTo(2));
        assertThat(newCandidateEducations, equalTo(candidateEducationList));
    }

}
