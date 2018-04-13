package by.interview.portal.converter.impl;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Interview;
import by.interview.portal.dto.InterviewDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component("interviewDTOConverter")
public class InterviewDTOConverter implements Converter<Interview, InterviewDTO> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Interview convertToEntity(InterviewDTO interviewDTO) {
        return modelMapper.map(interviewDTO, Interview.class);
    }

    @Override
    public InterviewDTO convertToDTO(Interview interview) {
        return modelMapper.map(interview, InterviewDTO.class);
    }
}
