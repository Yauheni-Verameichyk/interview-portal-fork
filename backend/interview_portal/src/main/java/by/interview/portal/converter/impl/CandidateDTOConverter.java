package by.interview.portal.converter.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Candidate;
import by.interview.portal.dto.CandidateDTO;

@Component("candidateDTOConverter")
public class CandidateDTOConverter implements Converter<Candidate, CandidateDTO> {

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
