package by.interview.portal.converter.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Discipline;
import by.interview.portal.dto.DisciplineWithHeadsDTO;

@Component("disciplineWithHeadsConverter")
public class DisciplineWithHeadsConverter
        implements Converter<Discipline, DisciplineWithHeadsDTO> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Discipline convertToEntity(DisciplineWithHeadsDTO disciplineDTO) {
        return modelMapper.map(disciplineDTO, Discipline.class);
    }

    @Override
    public DisciplineWithHeadsDTO convertToDTO(Discipline discipline) {
        return modelMapper.map(discipline, DisciplineWithHeadsDTO.class);
    }
}
