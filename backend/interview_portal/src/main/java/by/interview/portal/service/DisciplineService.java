package by.interview.portal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.interview.portal.domain.Discipline;
import by.interview.portal.repository.DisciplineRepository;

@Service
@Transactional
public class DisciplineService {

    @Autowired
    private DisciplineRepository disciplineRepository;

    public Discipline findById(Long id) {
        Optional<Discipline> discipline = disciplineRepository.findById(id);
        return discipline.isPresent() ? discipline.get() : null;

    }


    public List<Discipline> findByParentId(Long id) {
        return disciplineRepository.findAllByParentId(id);
    }

    // add exception cast in the future if discipline with this name already exists
    public void save(Discipline discipline) {
        if (disciplineRepository.findByName(discipline.getName()) == null) {
            discipline = disciplineRepository.save(discipline);
        }
    }

}
