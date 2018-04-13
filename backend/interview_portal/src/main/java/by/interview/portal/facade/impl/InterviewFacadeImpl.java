package by.interview.portal.facade.impl;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Interview;
import by.interview.portal.dto.FullInterviewInfoDTO;
import by.interview.portal.dto.InterviewDTO;
import by.interview.portal.facade.InterviewFacade;
import by.interview.portal.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class InterviewFacadeImpl implements InterviewFacade {

    @Autowired
    private InterviewService interviewService;

    @Autowired
    @Qualifier("interviewDTOConverter")
    private Converter<Interview, InterviewDTO> interviewConverter;

    @Autowired
    @Qualifier("fullInterviewInfoDTOConverter")
    private Converter<Interview, FullInterviewInfoDTO> fullInterviewInfoConverter;

    @Override
    public List<InterviewDTO> findAll(Integer quantity) {
        return interviewService.findAll(quantity).stream().filter(Objects::nonNull)
                .map(interviewConverter::convertToDTO).collect(Collectors.toList());
    }

    public FullInterviewInfoDTO findById(Long id) {
        return fullInterviewInfoConverter.convertToDTO(interviewService.findById(id));
    }

    @Override
    public void add(FullInterviewInfoDTO interview) {
        interviewService.add(fullInterviewInfoConverter.convertToEntity(interview));
    }

    @Override
    public void update(FullInterviewInfoDTO interview) {
        interviewService.update(fullInterviewInfoConverter.convertToEntity(interview));
    }

    @Override
    public void delete(Long id) {
        interviewService.delete(id);
    }

}
