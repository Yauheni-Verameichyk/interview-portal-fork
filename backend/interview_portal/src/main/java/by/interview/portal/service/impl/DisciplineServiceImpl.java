package by.interview.portal.service.impl;

import java.util.List;
import java.util.Optional;

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
import by.interview.portal.repository.DisciplineRepository;
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
    @Qualifier("disciplineConverter")
    private Converter<Discipline, DisciplineDTO> disciplineConverter;

    @Override
    public Discipline findById(Long id) {
        Optional<Discipline> discipline = disciplineRepository.findById(id);
        return discipline.isPresent() ? discipline.get() : null;

    }

    @Override
    public List<Discipline> findByParentId(Long id) {
        return disciplineRepository.findAllByParentId(id);
    }

    // add exception cast in the future if discipline with this name already exists
    @Override
    public void save(DisciplineDTO disciplineDTO) {
        if (disciplineRepository.findByName(disciplineDTO.getName()) == null) {
            Discipline discipline =
                    disciplineRepository.save(disciplineConverter.convertToEntity(disciplineDTO));
            for (User user : disciplineDTO.getDisciplineHeadsList()) {
                userRoleDisciplineRepository
                        .save(new UserRoleDiscipline(null, Role.DISCIPLINE_HEAD, discipline, user));
            }
        }
    }

    @Override
    public List<Discipline> findDisciplinesByUser(String login) {
        return disciplineRepository.findDisciplinesByUser(login);
    };
}
