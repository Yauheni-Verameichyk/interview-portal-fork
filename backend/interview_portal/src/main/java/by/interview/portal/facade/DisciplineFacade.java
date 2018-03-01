package by.interview.portal.facade;

import java.util.List;

import by.interview.portal.domain.Discipline;
import by.interview.portal.dto.DisciplineDTO;

public interface DisciplineFacade {

    DisciplineDTO findById(Long id);

    List<Discipline> findByParentId(Long id);

    void save(DisciplineDTO discipline);

    List<Discipline> findDisciplinesByUser(String login);
}
