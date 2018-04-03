package by.interview.portal.facade.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import by.interview.portal.dto.DisciplineDTO;
import by.interview.portal.dto.DisciplineWithHeadsDTO;
import by.interview.portal.facade.DisciplineFacade;
import by.interview.portal.service.DisciplineService;

@Service
public class DisciplineFacadeImpl implements DisciplineFacade {

    @Autowired
    private DisciplineService disciplineService;

    @Override
    public DisciplineWithHeadsDTO findById(Long id) {
        DisciplineWithHeadsDTO disciplineDTO = disciplineService.findById(id);
        return disciplineDTO;
    }

    @Override
    public List<DisciplineDTO> findByParentId(Long id) {
        return disciplineService.findByParentId(id);
    }

    @Override
    public List<DisciplineDTO> findByParentId(Long id, Integer quantity) {
        return disciplineService.findByParentId(id, quantity);
    }

    @Override
    public void save(DisciplineWithHeadsDTO disciplineDTO) {
        disciplineService.save(disciplineDTO);
    }

    @Override
    public List<DisciplineDTO> findDisciplinesByUser(String login) {
        return disciplineService.findDisciplinesByUser(login);
    }

    @Override
    public void deleteDiscipline(Long id) {
        disciplineService.deleteDiscipline(id);
    }
}
