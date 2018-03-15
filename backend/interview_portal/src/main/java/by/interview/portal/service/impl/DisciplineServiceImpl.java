package by.interview.portal.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
import by.interview.portal.service.DisciplineService;

@Service
@Transactional
public class DisciplineServiceImpl implements DisciplineService {

    @Autowired
    private DisciplineRepository disciplineRepository;

    @Autowired
    private UserRoleDisciplineRepository userRoleDisciplineRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    @Qualifier("userDTOConverter")
    private Converter<User, UserDTO> userDTOConverter;

    @Autowired
    @Qualifier("userBaseInfoDTOConverter")
    private Converter<User, UserBaseInfoDTO> userBaseInfoDTOConverter;

    @Autowired
    @Qualifier("disciplineDTOConverter")
    private Converter<Discipline, DisciplineDTO> disciplineDTOConverter;

    @Autowired
    @Qualifier("disciplineWithHeadsConverter")
    private Converter<Discipline, DisciplineWithHeadsDTO> disciplineWithHeadsConverter;

    @Override
    public DisciplineWithHeadsDTO findById(Long id) {
        Discipline discipline = disciplineRepository.findById(id).get();
        DisciplineWithHeadsDTO disciplineDTO =
                disciplineWithHeadsConverter.convertToDTO(discipline);
        if (disciplineDTO.getParentId() != null) {
            Discipline parentDiscipline =
                    disciplineRepository.findById(disciplineDTO.getParentId()).get();
            disciplineDTO.setParentName(parentDiscipline.getName());
        } else {
            disciplineDTO.setDisciplineHeadsList(userRepository
                    .findAllByRoleAndDiscipline(Role.DISCIPLINE_HEAD, discipline).stream()
                    .filter(Objects::nonNull).map(userBaseInfoDTOConverter::convertToDTO)
                    .collect(Collectors.toSet()));
        }
        return disciplineDTO;
    }

    @Override
    public List<DisciplineDTO> findByParentId(Long id) {
        List<DisciplineDTO> disciplineDTOsList = disciplineRepository.findAllByParentId(id).stream()
                .map(disciplineDTOConverter::convertToDTO).collect(Collectors.toList());
        for (DisciplineDTO discipline : disciplineDTOsList) {
            discipline.setHasSubItems(
                    disciplineRepository.findAllByParentId(discipline.getId()).size() > 0);
        }
        return disciplineDTOsList;
    }

    @Override
    public void save(DisciplineWithHeadsDTO disciplineDTO) {
        Discipline discipline = disciplineRepository
                .save(disciplineWithHeadsConverter.convertToEntity(disciplineDTO));
        saveDisciplineHeads(disciplineDTO, discipline);
    }

    @Override
    public List<DisciplineDTO> findDisciplinesByUser(String login) {
        List<DisciplineDTO> disciplineDTOsList = disciplineRepository.findDisciplinesByUser(login)
                .stream().map(disciplineDTOConverter::convertToDTO).collect(Collectors.toList());
        for (DisciplineDTO discipline : disciplineDTOsList) {
            discipline.setHasSubItems(
                    disciplineRepository.findAllByParentId(discipline.getId()).size() > 0);
        }
        return disciplineDTOsList;
    };

    @Override
    public void deleteDiscipline(Long id) {
        Discipline discipline = disciplineRepository.findById(id).get();
        deleteUserAssignments(discipline);
        deleteCandidateAssignements(discipline);
        deleteChilds(discipline);
        disciplineRepository.delete(discipline);
    }

    private void deleteChilds(Discipline discipline) {
        List<Discipline> childsList = disciplineRepository.findAllByParentId(discipline.getId());
        for (Discipline childDiscipline : childsList) {
            deleteDiscipline(childDiscipline.getId());
        }
    }

    private void deleteUserAssignments(Discipline discipline) {
        userRoleDisciplineRepository.deleteByDiscipline(discipline);
    }

    private void deleteCandidateAssignements(Discipline discipline) {
        List<Candidate> candidatesList = candidateRepository.findByDiscipline(discipline);
        for (Candidate candidate : candidatesList) {
            candidate.getDisciplineList().remove(discipline);
            candidateRepository.save(candidate);
        }
    }

    private void saveDisciplineHeads(DisciplineWithHeadsDTO disciplineDTO, Discipline discipline) {
        List<UserRoleDiscipline> currentUsersList = userRoleDisciplineRepository
                .findAllByRoleAndDiscipline(Role.DISCIPLINE_HEAD, discipline);
        Set<User> newUsersList = getDisciplinesHeadsList(disciplineDTO);
        assignNewUsers(newUsersList, currentUsersList, discipline);
        removeDeletedAssignments(newUsersList, currentUsersList);
    }

    private void assignNewUsers(Set<User> newUsersList, List<UserRoleDiscipline> currentUsersList,
            Discipline discipline) {
        for (User user : newUsersList) {
            if (!currentUsersList.stream()
                    .anyMatch(urd -> urd.getUser().getId().equals(user.getId()))) {
                userRoleDisciplineRepository
                        .save(new UserRoleDiscipline(null, Role.DISCIPLINE_HEAD, discipline, user));
            }
        }
    }

    private void removeDeletedAssignments(Set<User> newUsersList,
            List<UserRoleDiscipline> currentUsersList) {
        for (UserRoleDiscipline urd : currentUsersList) {
            if (!newUsersList.stream()
                    .anyMatch(user -> user.getId().equals(urd.getUser().getId()))) {
                userRoleDisciplineRepository.delete(urd);
            }
        }
    }

    private Set<User> getDisciplinesHeadsList(DisciplineWithHeadsDTO disciplineDTO) {
        return disciplineDTO.getDisciplineHeadsList() != null
                ? disciplineDTO.getDisciplineHeadsList().stream().filter(Objects::nonNull)
                        .map(userBaseInfoDTOConverter::convertToEntity).collect(Collectors.toSet())
                : Collections.emptySet();
    }
}
