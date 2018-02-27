package by.interview.portal.facade.impl;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Candidate;
import by.interview.portal.dto.CandidateDTO;
import by.interview.portal.facade.CandidateFacade;
import by.interview.portal.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CandidateFacadeImpl implements CandidateFacade {

    @Autowired
    private CandidateService candidateService;

    @Autowired
    @Qualifier("candidateConverter")
    private Converter<Candidate, CandidateDTO> candidateConverter;

    @Override
    public List<CandidateDTO> findAll(Integer quantity) {
        return candidateService.findAll(quantity).stream()
                .filter(Objects::nonNull)
                .map(candidateConverter::convertToDTO)
                .collect(Collectors.toList());
    }
}
