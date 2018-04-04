package by.interview.portal.facade;

import java.util.List;

import by.interview.portal.dto.DisciplineDTO;
import by.interview.portal.dto.DisciplineWithHeadsDTO;

public interface DisciplineFacade {

    DisciplineWithHeadsDTO findById(Long id);

    List<DisciplineDTO> findByParentId(Long id);

    List<DisciplineDTO> findByParentId(Long id, Integer quantity);

    void save(DisciplineWithHeadsDTO discipline);

    List<DisciplineDTO> findDisciplinesByUser(String login);

    void deleteDiscipline(Long id);
}
