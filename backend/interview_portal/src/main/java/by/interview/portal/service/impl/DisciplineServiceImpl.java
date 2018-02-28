package by.interview.portal.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.interview.portal.domain.Discipline;
import by.interview.portal.repository.DisciplineRepository;
import by.interview.portal.service.DisciplineService;

@Service
@Transactional
public class DisciplineServiceImpl implements DisciplineService {

	@Autowired
	private DisciplineRepository disciplineRepository;

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
	public void save(Discipline discipline) {
		if (disciplineRepository.findByName(discipline.getName()) == null) {
			discipline = disciplineRepository.save(discipline);
		}
	}

	@Override
	public List<Discipline> findDisciplinesByUser(String login) {
		return disciplineRepository.findDisciplinesByUser(login);
	};
}
