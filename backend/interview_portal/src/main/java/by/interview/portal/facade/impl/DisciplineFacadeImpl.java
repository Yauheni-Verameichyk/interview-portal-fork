package by.interview.portal.facade.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import by.interview.portal.domain.Discipline;
import by.interview.portal.dto.DisciplineDTO;
import by.interview.portal.facade.DisciplineFacade;
import by.interview.portal.service.DisciplineService;

@Service
public class DisciplineFacadeImpl implements DisciplineFacade {

    @Autowired
    private DisciplineService disciplineService;

    @Override
    public DisciplineDTO findById(Long id) {
        DisciplineDTO disciplineDTO = disciplineService.findById(id);
        return disciplineDTO;
    }

    @Override
    public List<Discipline> findByParentId(Long id) {
        return disciplineService.findByParentId(id);
    }

    @Override
    public void save(DisciplineDTO disciplineDTO) {
        disciplineService.save(disciplineDTO);
    }

    @Override
    public List<Discipline> findDisciplinesByUser(String login) {
        return disciplineService.findDisciplinesByUser(login);
    };
}
