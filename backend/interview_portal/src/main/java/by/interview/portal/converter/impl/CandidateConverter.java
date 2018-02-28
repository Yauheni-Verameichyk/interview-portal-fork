package by.interview.portal.converter.impl;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Candidate;
import by.interview.portal.dto.CandidateDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component("candidateConverter")
public class CandidateConverter implements Converter<Candidate, CandidateDTO> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public Candidate convertToEntity(CandidateDTO candidateDTO) {
        return modelMapper.map(candidateDTO, Candidate.class);
    }

    @Override
    public CandidateDTO convertToDTO(Candidate candidate) {
        return modelMapper.map(candidate, CandidateDTO.class);
    }
}
