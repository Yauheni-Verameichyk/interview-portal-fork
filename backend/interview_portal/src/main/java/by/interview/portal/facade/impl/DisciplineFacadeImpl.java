package by.interview.portal.facade.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import by.interview.portal.domain.Discipline;
import by.interview.portal.facade.DisciplineFacade;
import by.interview.portal.service.DisciplineService;

@Service
public class DisciplineFacadeImpl implements DisciplineFacade {

	@Autowired
	private DisciplineService disciplineService;

	@Override
	public Discipline findById(Long id) {
		Discipline discipline = disciplineService.findById(id);
		return discipline;

	}

	@Override
	public List<Discipline> findByParentId(Long id) {
		return disciplineService.findByParentId(id);
	}

	@Override
	public void save(Discipline discipline) {
		disciplineService.save(discipline);
	}

	@Override
	public List<Discipline> findDisciplinesByUser(String login) {
		return disciplineService.findDisciplinesByUser(login);
	};
}
