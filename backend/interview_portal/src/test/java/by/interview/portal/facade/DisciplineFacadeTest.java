package by.interview.portal.facade;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.junit4.SpringRunner;

import by.interview.portal.domain.Role;
import by.interview.portal.dto.DisciplineDTO;
import by.interview.portal.dto.DisciplineWithHeadsDTO;
import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.facade.impl.DisciplineFacadeImpl;
import by.interview.portal.service.DisciplineService;

@RunWith(SpringRunner.class)
public class DisciplineFacadeTest {

    @Mock
    private DisciplineService disciplineService;

    @InjectMocks
    private DisciplineFacade disciplineFacade = new DisciplineFacadeImpl();

    private DisciplineDTO disciplineDTO;

    private DisciplineWithHeadsDTO disciplineWithHeadsDTO;

    private DisciplineDTO subItem;

    @Before
    public void doSetup() {
        disciplineDTO = new DisciplineDTO(1L, "Name", "Description", null, false);
        UserBaseInfoDTO userBaseInfoDTO = new UserBaseInfoDTO((long) 1, "Vasia", "Pupkin",
                Stream.of(Role.DISCIPLINE_HEAD).collect(Collectors.toSet()));
        disciplineWithHeadsDTO = new DisciplineWithHeadsDTO(1, "Name", "Description", null, null,
                Stream.of(userBaseInfoDTO).collect(Collectors.toSet()));
        subItem = new DisciplineDTO(2L, "SubName", "Description", 2L, false);
    }

    @Test
    public void shouldReturnDisciplineWithHeadsDTO() {
        given(disciplineService.findById(1L)).willReturn(disciplineWithHeadsDTO);
        assertThat(disciplineFacade.findById(1L), equalTo(disciplineWithHeadsDTO));
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldThrowExceptionDuringReadingSingleDiscipline() {
        given(disciplineService.findById(1L)).willThrow(new DataIntegrityViolationException(null));
        disciplineFacade.findById(1L);
    }

    @Test
    public void shouldReturnDisciplinesListByParentId() {
        given(disciplineService.findByParentId(1L)).willReturn(Arrays.asList(subItem));
        assertThat(disciplineFacade.findByParentId(1L).get(0), equalTo(subItem));
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldThrowExceptionDuringReadingDisciplinesListByParentId() {
        given(disciplineService.findByParentId(1L))
                .willThrow(new DataIntegrityViolationException(null));
        disciplineFacade.findByParentId(1L);
    }

    @Test
    public void shouldInvokeSaveMethod() {
        doNothing().when(disciplineService).save(disciplineWithHeadsDTO);
        disciplineFacade.save(disciplineWithHeadsDTO);
        verify(disciplineService, times(1)).save(disciplineWithHeadsDTO);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldThrowExceptionDuringInvokingSaveMethod() {
        doThrow(new DataIntegrityViolationException(null)).when(disciplineService)
                .save(disciplineWithHeadsDTO);
        disciplineFacade.save(disciplineWithHeadsDTO);
    }

    @Test
    public void shouldReturnDisciplinesListForUser() {
        given(disciplineService.findDisciplinesByUser("userName"))
                .willReturn(Arrays.asList(disciplineDTO));
        assertThat(disciplineFacade.findDisciplinesByUser("userName").get(0),
                equalTo(disciplineDTO));
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldThrowExceptionDuringReadingDisciplinesListForUser() {
        given(disciplineService.findDisciplinesByUser(null))
                .willThrow(new DataIntegrityViolationException(null));
        disciplineFacade.findDisciplinesByUser(null);
    }

    @Test
    public void shouldDeleteDiscipline() throws Exception {
        doNothing().when(disciplineService).deleteDiscipline(1L);
        disciplineFacade.deleteDiscipline(1L);
        verify(disciplineService, times(1)).deleteDiscipline(1L);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldThrowExceptionDuringInvokingDeleteMethod() {
        doThrow(new DataIntegrityViolationException(null)).when(disciplineService)
                .deleteDiscipline(1l);
        disciplineFacade.deleteDiscipline(1L);
    }
}
