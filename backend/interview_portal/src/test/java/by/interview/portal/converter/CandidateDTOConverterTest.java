package by.interview.portal.converter;

import by.interview.portal.config.SpringConfig;
import by.interview.portal.config.TestConverterConfig;
import by.interview.portal.domain.Candidate;
import by.interview.portal.domain.CandidateEducation;
import by.interview.portal.domain.CandidateWork;
import by.interview.portal.domain.Discipline;
import by.interview.portal.dto.CandidateDTO;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {SpringConfig.class, TestConverterConfig.class})
public class CandidateDTOConverterTest {

    @Autowired
    @Qualifier("candidateDTOConverter")
    private Converter<Candidate, CandidateDTO> candidateDTOConverter;

    private Candidate candidate;

    private Candidate afterConverterCandidate;

    private CandidateDTO candidateDTO;

    @Before
    public void doSetup() {
        CandidateWork candidateWork = new CandidateWork(1L, "Integral", "engineer");
        CandidateEducation candidateEducation =
                new CandidateEducation(1L, "PSU", "Radio-Technical");
        Discipline discipline = new Discipline(1L, "Java", "Best of the best!!!", null);
        candidate = new Candidate(1L, "Eugene", " Veremeichik", "+254545454",
                Stream.of(discipline).collect(Collectors.toSet()),
                Stream.of(candidateWork).collect(Collectors.toList()),
                Stream.of(candidateEducation).collect(Collectors.toList()));
        afterConverterCandidate = new Candidate(1L, "Eugene", " Veremeichik", "+254545454",
                Stream.of(discipline).collect(Collectors.toSet()), null, null);
        candidateDTO = new CandidateDTO(1L, "Eugene", " Veremeichik", "+254545454",
                Stream.of(discipline).collect(Collectors.toSet()));

    }

    @Test
    public void shouldConvertCandidateToCandidateDTO() {
        assertThat(candidateDTOConverter.convertToDTO(candidate), equalTo(candidateDTO));
    }

    @Test
    public void shouldConvertCandidateDTOToCandidate() {
        assertThat(candidateDTOConverter.convertToEntity(candidateDTO), equalTo(afterConverterCandidate));
    }

}
