package by.interview.portal.converter.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Discipline;
import by.interview.portal.dto.DisciplineDTO;

@Component("disciplineConverter")
public class DisciplineConverter implements Converter<Discipline, DisciplineDTO> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Discipline convertToEntity(DisciplineDTO disciplineDTO) {
        return modelMapper.map(disciplineDTO, Discipline.class);
    }

    @Override
    public DisciplineDTO convertToDTO(Discipline discipline) {
        return modelMapper.map(discipline, DisciplineDTO.class);
    }
}
