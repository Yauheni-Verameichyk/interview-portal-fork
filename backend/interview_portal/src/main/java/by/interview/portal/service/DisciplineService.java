package by.interview.portal.service;

import java.util.List;
import java.util.Set;

import by.interview.portal.dto.DisciplineDTO;
import by.interview.portal.dto.DisciplineWithHeadsDTO;

public interface DisciplineService {

    DisciplineWithHeadsDTO findById(Long id);

    List<DisciplineDTO> findByParentId(Long id);

    List<DisciplineDTO> findByParentId(Long id, Integer quantity);

    void save(DisciplineWithHeadsDTO disciplineDTO);

    List<DisciplineDTO> findDisciplinesByUser(String login);

    void deleteDiscipline(Long id);

    Set<DisciplineDTO> findWithParameters(String search);
}
