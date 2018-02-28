package by.interview.portal.facade;

import java.util.List;

import by.interview.portal.domain.Discipline;

public interface DisciplineFacade {

	Discipline findById(Long id);

	List<Discipline> findByParentId(Long id);

	void save(Discipline discipline);

	List<Discipline> findDisciplinesByUser(String login);
}
