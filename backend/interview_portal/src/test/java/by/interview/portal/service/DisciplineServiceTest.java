package by.interview.portal.service;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import by.interview.portal.domain.CandidateEducation;
import by.interview.portal.domain.CandidateWork;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.test.context.junit4.SpringRunner;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Candidate;
import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.User;
import by.interview.portal.domain.UserRoleDiscipline;
import by.interview.portal.dto.DisciplineDTO;
import by.interview.portal.dto.DisciplineWithHeadsDTO;
import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.dto.UserDTO;
import by.interview.portal.repository.CandidateRepository;
import by.interview.portal.repository.DisciplineRepository;
import by.interview.portal.repository.UserRepository;
import by.interview.portal.repository.UserRoleDisciplineRepository;
import by.interview.portal.service.impl.DisciplineServiceImpl;

@RunWith(SpringRunner.class)
public class DisciplineServiceTest {

    @Mock
    private DisciplineRepository disciplineRepository;
    @Mock
    private UserRoleDisciplineRepository userRoleDisciplineRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private CandidateRepository candidateRepository;
    @Mock
    private Converter<User, UserDTO> userDTOConverter;
    @Mock
    private Converter<User, UserBaseInfoDTO> userBaseInfoDTOConverter;
    @Mock
    private Converter<Discipline, DisciplineDTO> disciplineDTOConverter;
    @Mock
    private Converter<Discipline, DisciplineWithHeadsDTO> disciplineWithHeadsConverter;

    @InjectMocks
    private DisciplineService disciplineService = new DisciplineServiceImpl();
    private Discipline discipline;
    private Discipline subItem;
    private DisciplineDTO disciplineDTO;
    private DisciplineWithHeadsDTO disciplineWithHeadsDTO;
    private DisciplineWithHeadsDTO disciplineWithoutHeadsDTO;
    private DisciplineDTO subItemDTO;
    private DisciplineWithHeadsDTO convertedDisciplineDTO;
    private User user;
    private UserBaseInfoDTO userBaseInfoDTO;
    private UserRoleDiscipline userRoleDiscipline;

    @Before
    public void doSetup() {
        disciplineDTO = new DisciplineDTO(1L, "Name", "Description", null, false);
        userBaseInfoDTO = new UserBaseInfoDTO(1L, "Vasia", "Pupkin",
                Stream.of(Role.DISCIPLINE_HEAD).collect(Collectors.toSet()));
        disciplineWithHeadsDTO = new DisciplineWithHeadsDTO(1, "Name", "Description", null, null,
                Stream.of(userBaseInfoDTO).collect(Collectors.toSet()));
        disciplineWithoutHeadsDTO =
                new DisciplineWithHeadsDTO(1, "Name", "Description", null, null, null);
        subItemDTO = new DisciplineDTO(2L, "SubName", "Description", 1L, false);
        subItem = new Discipline(2L, "SubName", "Description", 1L);
        discipline = new Discipline(1, "Name", "Description", null);

        convertedDisciplineDTO = new DisciplineWithHeadsDTO();
        convertedDisciplineDTO.setId(1L);
        convertedDisciplineDTO.setName("Name");
        convertedDisciplineDTO.setSubscription("Description");

        user = new User();
        user.setId(1L);
        user.setName("Vasia");
        user.setLogin("sgfg");
        user.setPhoneNumber("dfgsg");
        user.setSurname("Pupkin");
        userRoleDiscipline = new UserRoleDiscipline(1L, Role.DISCIPLINE_HEAD, discipline, null);
        user.setUserRoleDisciplines(Arrays.asList(userRoleDiscipline));
    }

    @Test
    public void shouldReturnDisciplineWithHeadsDTO() {
        given(disciplineRepository.findById(1L)).willReturn(Optional.of(discipline));
        given(disciplineWithHeadsConverter.convertToDTO(discipline))
                .willReturn(convertedDisciplineDTO);
        given(userRepository.findAllByRoleAndDiscipline(Role.DISCIPLINE_HEAD, discipline))
                .willReturn(new HashSet<>(Arrays.asList(user)));
        given(userBaseInfoDTOConverter.convertToDTO(user)).willReturn(userBaseInfoDTO);
        assertThat(disciplineService.findById(1L), equalTo(disciplineWithHeadsDTO));
    }

    @Test
    public void shouldReturnSubItem() {
        given(disciplineRepository.findById(2L)).willReturn(Optional.of(subItem));
        DisciplineWithHeadsDTO convertedSubItemDTO =
                new DisciplineWithHeadsDTO(2L, "SubName", "Description", 1L, null, null);
        DisciplineWithHeadsDTO expectedSubItemDTO =
                new DisciplineWithHeadsDTO(2L, "SubName", "Description", 1L, "Name", null);
        given(disciplineWithHeadsConverter.convertToDTO(subItem)).willReturn(convertedSubItemDTO);
        given(disciplineRepository.findById(1L)).willReturn(Optional.of(discipline));
        assertThat(disciplineService.findById(2L), equalTo(expectedSubItemDTO));
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldThrowExceptionDuringReadingSingleDiscipline() {
        given(disciplineRepository.findById(1L))
                .willThrow(new DataIntegrityViolationException(null));
        disciplineService.findById(1L);
    }

    @Test
    public void shouldReturnDisciplinesListByParentIdAndDisciplineWithoutSubItems() {
        given(disciplineRepository.findAllByParentId(null)).willReturn(Arrays.asList(discipline));
        given(disciplineDTOConverter.convertToDTO(discipline)).willReturn(disciplineDTO);
        given(disciplineRepository.findAllByParentId(1L)).willReturn(new ArrayList<>());
        assertThat(disciplineService.findByParentId(null).get(0), equalTo(disciplineDTO));
    }

    @Test
    public void shouldReturnDisciplinesListByParentIdAndDisciplineWithSubItems() {
        given(disciplineRepository.findAllByParentId(null)).willReturn(Arrays.asList(discipline));
        given(disciplineDTOConverter.convertToDTO(discipline)).willReturn(disciplineDTO);
        given(disciplineRepository.findAllByParentId(1L)).willReturn(Arrays.asList(subItem));
        given(disciplineDTOConverter.convertToDTO(subItem)).willReturn(subItemDTO);
        assertThat(disciplineService.findByParentId(null).get(0), equalTo(disciplineDTO));
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldThrowExceptionDuringReadingDisciplinesListByParentId() {
        given(disciplineRepository.findAllByParentId(1L))
                .willThrow(new DataIntegrityViolationException(null));
        disciplineService.findByParentId(1L);
    }

    @Test
    public void shouldInvokeSaveMethodAndSaveNewDisciplineHeads() {
        given(disciplineRepository.save(discipline)).willReturn(discipline);
        given(disciplineWithHeadsConverter.convertToEntity(disciplineWithHeadsDTO))
                .willReturn(discipline);
        disciplineService.save(disciplineWithHeadsDTO);
        verify(disciplineRepository, times(1)).save(discipline);
    }

    @Test
    public void shouldRemoveOldDisciplineHeads() {
        given(disciplineRepository.save(discipline)).willReturn(discipline);
        given(disciplineWithHeadsConverter.convertToEntity(disciplineWithoutHeadsDTO))
                .willReturn(discipline);
        given(userRoleDisciplineRepository.findAllByRoleAndDiscipline(Role.DISCIPLINE_HEAD,
                discipline)).willReturn(Arrays.asList(userRoleDiscipline));
        disciplineService.save(disciplineWithoutHeadsDTO);
        verify(disciplineRepository, times(1)).save(discipline);
    }

    @Test
    public void shouldInvokeSaveMethodAndDontSaveAnyNewDisciplineHead() {
        UserRoleDiscipline urd = new UserRoleDiscipline(2L, Role.DISCIPLINE_HEAD, discipline, user);
        given(disciplineRepository.save(discipline)).willReturn(discipline);
        given(disciplineWithHeadsConverter.convertToEntity(disciplineWithHeadsDTO))
                .willReturn(discipline);
        given(userBaseInfoDTOConverter.convertToEntity(userBaseInfoDTO)).willReturn(user);
        given(userRoleDisciplineRepository.findAllByRoleAndDiscipline(Role.DISCIPLINE_HEAD,
                discipline)).willReturn(Arrays.asList(urd));
        disciplineService.save(disciplineWithHeadsDTO);
        verify(disciplineRepository, times(1)).save(discipline);
    }

    @Test
    public void shouldNotRemoveAnyOldDisciplineHead() {
        given(disciplineRepository.save(discipline)).willReturn(discipline);
        given(disciplineWithHeadsConverter.convertToEntity(disciplineWithoutHeadsDTO))
                .willReturn(discipline);
        disciplineService.save(disciplineWithoutHeadsDTO);
        verify(disciplineRepository, times(1)).save(discipline);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldThrowExceptionDuringInvokingSaveMethod() {
        doThrow(new DataIntegrityViolationException(null)).when(disciplineRepository)
                .save(discipline);
        given(disciplineWithHeadsConverter.convertToEntity(disciplineWithHeadsDTO))
                .willReturn(discipline);
        disciplineService.save(disciplineWithHeadsDTO);
    }

    @Test
    public void shouldReturnDisciplinesListForUserWithoutSubItems() {
        given(disciplineRepository.findDisciplinesByUser("userName"))
                .willReturn(new HashSet<>(Arrays.asList(discipline)));
        given(disciplineDTOConverter.convertToDTO(discipline)).willReturn(disciplineDTO);
        given(disciplineRepository.findAllByParentId(1L)).willReturn(new ArrayList<>());
        assertThat(disciplineService.findDisciplinesByUser("userName").get(0),
                equalTo(disciplineDTO));
    }

    @Test
    public void shouldReturnDisciplinesListForUserWithSubItems() {
        given(disciplineRepository.findDisciplinesByUser("userName"))
                .willReturn(new HashSet<>(Arrays.asList(discipline)));
        given(disciplineDTOConverter.convertToDTO(discipline)).willReturn(disciplineDTO);
        given(disciplineRepository.findAllByParentId(1L)).willReturn(Arrays.asList(subItem));
        given(disciplineDTOConverter.convertToDTO(subItem)).willReturn(subItemDTO);
        assertThat(disciplineService.findDisciplinesByUser("userName").get(0),
                equalTo(disciplineDTO));
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldThrowExceptionDuringReadingDisciplinesListForUser() {
        given(disciplineRepository.findDisciplinesByUser(null))
                .willThrow(new DataIntegrityViolationException(null));
        disciplineService.findDisciplinesByUser(null);
    }

    @Test
    public void shouldDeleteDiscipline() throws Exception {
        doNothing().when(disciplineRepository).delete(discipline);
        given(disciplineRepository.findById(discipline.getId()))
                .willReturn(Optional.of(discipline));
        disciplineService.deleteDiscipline(1L);
        verify(disciplineRepository, times(1)).delete(discipline);
    }

    @Test
    public void shouldDeleteDisciplineWithSubItems() throws Exception {
        doNothing().when(disciplineRepository).delete(discipline);
        given(disciplineRepository.findById(discipline.getId()))
                .willReturn(Optional.of(discipline));
        given(disciplineRepository.findAllByParentId(discipline.getId()))
                .willReturn(Arrays.asList(subItem));
        given(disciplineRepository.findById(subItem.getId())).willReturn(Optional.of(subItem));
        disciplineService.deleteDiscipline(1L);
        verify(disciplineRepository, times(1)).delete(discipline);
        verify(disciplineRepository, times(1)).delete(subItem);
    }

    @Test
    public void shouldDeleteDisciplineFromCandidates() throws Exception {
        doNothing().when(disciplineRepository).delete(discipline);
        given(disciplineRepository.findById(discipline.getId()))
                .willReturn(Optional.of(discipline));

        Set<Discipline> disciplineList = new HashSet<>();
        disciplineList.add(discipline);
        Candidate candidate = new Candidate(5L, "Viktar", "Hrynko", "+12312312312", disciplineList,
                new ArrayList<CandidateWork>(), new ArrayList<CandidateEducation>());
        given(candidateRepository.findByDiscipline(discipline))
                .willReturn(Arrays.asList(candidate));
        disciplineService.deleteDiscipline(1L);
        verify(disciplineRepository, times(1)).delete(discipline);
        verify(candidateRepository, times(1)).save(candidate);
    }

    @Test(expected = DataIntegrityViolationException.class)
    public void shouldThrowExceptionDuringInvokingDeleteMethod() {
        doThrow(new DataIntegrityViolationException(null)).when(disciplineRepository)
                .delete(discipline);
        given(disciplineRepository.findById(discipline.getId()))
                .willReturn(Optional.of(discipline));
        disciplineService.deleteDiscipline(1L);
    }
}
