package by.interview.portal.service;

import static by.interview.portal.constant.PageConstant.QUANTITY_ELEMENTS_IN_PAGE;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import by.interview.portal.domain.Candidate;
import by.interview.portal.domain.Discipline;
import by.interview.portal.repository.CandidateEducationRepository;
import by.interview.portal.repository.CandidateRepository;
import by.interview.portal.repository.CandidateWorkRepository;
import by.interview.portal.repository.DisciplineRepository;
import by.interview.portal.service.impl.CandidateServiceImpl;
import org.springframework.data.domain.Sort;

@RunWith(MockitoJUnitRunner.class)
public class CandidateServiceTest {

    @Mock
    private CandidateRepository candidateRepository;
    @Mock
    private DisciplineRepository disciplineRepository;
    @Mock
    private CandidateEducationRepository candidateEducationRepository;
    @Mock
    private CandidateWorkRepository candidateWorkRepository;

    @InjectMocks
    private CandidateServiceImpl candidateService;

    private List<Candidate> candidateList;
    private Discipline discipline;
    private Page<Candidate> page;

    @Before
    public void beforeTest() {
        discipline = new Discipline(1L, "Java", "Best of the best!!!", null);
        Candidate candidate = new Candidate(1L, "Eugene", "mail@mail.ru", " Veremeichik",
                "+254545454", Stream.of(discipline).collect(Collectors.toSet()), null, null);
        Candidate candidate2 = new Candidate(2L, "Ilya", "mail@mail.ru", " Nikalayeu", "+254545454",
                Stream.of(discipline).collect(Collectors.toSet()), null, null);
        candidateList = Arrays.asList(candidate, candidate2);
        page = new PageImpl<Candidate>(candidateList);
    }

    @Test
    public void shouldReturnCandidateList() {
        when(candidateRepository.findAll(PageRequest.of(0, QUANTITY_ELEMENTS_IN_PAGE, orderBy()))).thenReturn(page);
        List<Candidate> newCandidateList = candidateService.findAll(0);
        assertNotNull(newCandidateList);
        assertThat(newCandidateList, equalTo(candidateList));
        assertThat(newCandidateList.size(), equalTo(2));
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldReturnExceptionFindAllCandidate() {
        when(candidateRepository.findAll(PageRequest.of(0, QUANTITY_ELEMENTS_IN_PAGE, orderBy())))
                .thenThrow(new DataIntegrityViolationException("error"));
        candidateService.findAll(0);
    }

    @Test
    public void shouldSaveNewCandidate() {
        when(disciplineRepository.findById(1L)).thenReturn(Optional.of(discipline));
        when(candidateRepository.saveAndFlush(candidateList.get(0)))
                .thenReturn(candidateList.get(0));
        candidateService.add(candidateList.get(0));
        verify(candidateRepository, times(1)).saveAndFlush(candidateList.get(0));
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldReturnExceptionSaveNewCandidate() {
        when(disciplineRepository.findById(1L)).thenReturn(Optional.of(discipline));
        when(candidateRepository.saveAndFlush(candidateList.get(0)))
                .thenThrow(new DataIntegrityViolationException("error"));
        candidateService.add(candidateList.get(0));
    }

    @Test
    public void shouldDeleteCandidateById() {
        doNothing().when(candidateRepository).deleteById(1L);
        candidateService.delete(1L);
        verify(candidateRepository, times(1)).deleteById(1L);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldReturnExceptionDeleteCandidate() {
        doThrow(new DataIntegrityViolationException(null)).when(candidateRepository).deleteById(1L);
        candidateService.delete(1L);
    }

    @Test
    public void shouldReturnCandidateById() {
        when(candidateRepository.findById(1L)).thenReturn(Optional.of(candidateList.get(0)));
        Candidate newCandidate = candidateService.findById(1L);
        assertNotNull(newCandidate);
        assertThat(newCandidate, equalTo(candidateList.get(0)));
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldReturnExceptionFindCandidateById() {
        when(candidateRepository.findById(1L))
                .thenThrow(new DataIntegrityViolationException("error"));
        candidateService.findById(1L);
    }

    @Test
    public void shouldUpdateCandidate() {
        initWorkAndEducationAndEducationRepository();
        when(candidateRepository.saveAndFlush(candidateList.get(0)))
                .thenReturn(candidateList.get(0));
        candidateService.update(candidateList.get(0));
        verify(candidateRepository, times(1)).saveAndFlush(candidateList.get(0));
        verify(candidateWorkRepository, times(1)).removeWork();
        verify(candidateEducationRepository, times(1)).removeEducation();
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldReturnExceptionUpdateCandidate() {
        initWorkAndEducationAndEducationRepository();
        when(candidateRepository.saveAndFlush(candidateList.get(0)))
                .thenThrow(new DataIntegrityViolationException("error"));
        candidateService.update(candidateList.get(0));
    }

    private void initWorkAndEducationAndEducationRepository() {
        doNothing().when(candidateWorkRepository).removeWork();
        doNothing().when(candidateEducationRepository).removeEducation();
        when(disciplineRepository.findById(1L)).thenReturn(Optional.of(discipline));

    }

    private Sort orderBy() {
        return new Sort(Sort.Direction.ASC, "name");
    }

}
