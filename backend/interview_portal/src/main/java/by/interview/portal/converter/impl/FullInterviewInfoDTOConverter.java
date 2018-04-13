package by.interview.portal.converter.impl;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Interview;
import by.interview.portal.dto.FullInterviewInfoDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component("fullInterviewInfoDTOConverter")
public class FullInterviewInfoDTOConverter implements Converter<Interview, FullInterviewInfoDTO> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Interview convertToEntity(FullInterviewInfoDTO interviewDTO) {
        return modelMapper.map(interviewDTO, Interview.class);
    }

    @Override
    public FullInterviewInfoDTO convertToDTO(Interview interview) {
        return modelMapper.map(interview, FullInterviewInfoDTO.class);
    }
}
