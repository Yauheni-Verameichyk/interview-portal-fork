package by.interview.portal.service;

import java.util.List;

import by.interview.portal.domain.Discipline;
import by.interview.portal.dto.DisciplineDTO;

public interface DisciplineService {

	DisciplineDTO findById(Long id);

	List<Discipline> findByParentId(Long id);

	void save(DisciplineDTO disciplineDTO);

	List<Discipline> findDisciplinesByUser(String login);
}
