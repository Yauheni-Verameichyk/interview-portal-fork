package by.interview.portal.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.User;
import by.interview.portal.domain.UserRoleDiscipline;
import by.interview.portal.dto.DisciplineDTO;
import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.dto.UserDTO;
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
    @Qualifier("userDTOConverter")
    private Converter<User, UserDTO> userDTOConverter;

    @Autowired
    @Qualifier("userBaseInfoDTOConverter")
    private Converter<User, UserBaseInfoDTO> userBaseInfoDTOConverter;

    @Autowired
    @Qualifier("disciplineConverter")
    private Converter<Discipline, DisciplineDTO> disciplineConverter;

    @Override
    public DisciplineDTO findById(Long id) {
        Optional<Discipline> discipline = disciplineRepository.findById(id);
        DisciplineDTO disciplineDTO = disciplineConverter.convertToDTO(discipline.get());
        if (disciplineDTO.getParentId() != null) {
            Discipline parentDiscipline =
                    disciplineRepository.findById(disciplineDTO.getParentId()).get();
            disciplineDTO.setParentName(parentDiscipline.getName());
        } else {
            disciplineDTO.setDisciplineHeadsList(userRepository
                    .findAllByRoleAndDiscipline(Role.DISCIPLINE_HEAD, discipline.get()).stream()
                    .filter(Objects::nonNull).map(userBaseInfoDTOConverter::convertToDTO)
                    .collect(Collectors.toSet()));
        }
        return disciplineDTO;
    }

    @Override
    public List<Discipline> findByParentId(Long id) {
        return disciplineRepository.findAllByParentId(id);
    }

    @Override
    public void save(DisciplineDTO disciplineDTO) {
        Discipline discipline =
                disciplineRepository.save(disciplineConverter.convertToEntity(disciplineDTO));
        saveDisciplineHeads(disciplineDTO, discipline);
    }

    private void saveDisciplineHeads(DisciplineDTO disciplineDTO, Discipline discipline) {

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

    Set<User> getDisciplinesHeadsList(DisciplineDTO disciplineDTO) {

        return disciplineDTO.getDisciplineHeadsList() != null
                ? disciplineDTO.getDisciplineHeadsList().stream().filter(Objects::nonNull)
                        .map(userBaseInfoDTOConverter::convertToEntity).collect(Collectors.toSet())
                : Collections.emptySet();
    }

    @Override
    public List<Discipline> findDisciplinesByUser(String login) {
        return disciplineRepository.findDisciplinesByUser(login);
    };
}
