package by.interview.portal.facade.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.SpecifiedTime;
import by.interview.portal.dto.SpecifiedTimeDTO;
import by.interview.portal.facade.SpecifiedTimeFacade;
import by.interview.portal.service.SpecifiedTimeService;

@Service
public class SpecifiedTimeFacadeImpl implements SpecifiedTimeFacade {

    @Autowired
    private SpecifiedTimeService specifiedTimeService;

    @Autowired
    @Qualifier("specifiedTimeConverter")
    private Converter<SpecifiedTime, SpecifiedTimeDTO> specifiedTimeConverter;

    @Override
    public List<SpecifiedTimeDTO> findAllInRange(LocalDateTime rangeStart, LocalDateTime rangeEnd,
            Long disciplineId) {
        return specifiedTimeService.findAllInRange(rangeStart, rangeEnd, disciplineId).stream()
                .filter(Objects::nonNull).map(specifiedTimeConverter::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<SpecifiedTimeDTO> findAllForUserInRange(LocalDateTime rangeStart,
            LocalDateTime rangeEnd) {
        return specifiedTimeService.findAllForUserInRange(rangeStart, rangeEnd).stream()
                .filter(Objects::nonNull).map(specifiedTimeConverter::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void save(SpecifiedTimeDTO specifiedTimeDTO) {
        specifiedTimeService.save(specifiedTimeConverter.convertToEntity(specifiedTimeDTO));
    }
}
