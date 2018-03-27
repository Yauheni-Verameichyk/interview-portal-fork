package by.interview.portal.converter.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.SpecifiedTime;
import by.interview.portal.domain.User;
import by.interview.portal.dto.SpecifiedTimeDTO;
import by.interview.portal.dto.UserBaseInfoDTO;

@Component("specifiedTimeConverter")
public class SpecifiedTimeConverter implements Converter<SpecifiedTime, SpecifiedTimeDTO> {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    @Qualifier("userBaseInfoDTOConverter")
    private Converter<User, UserBaseInfoDTO> userBaseInfoDTOConverter;

    @Override
    public SpecifiedTime convertToEntity(SpecifiedTimeDTO dto) {
        return modelMapper.map(dto, SpecifiedTime.class);
    }

    @Override
    public SpecifiedTimeDTO convertToDTO(SpecifiedTime entity) {
        SpecifiedTimeDTO specifiedTimeDTO = modelMapper.map(entity, SpecifiedTimeDTO.class);
        specifiedTimeDTO.setUser(userBaseInfoDTOConverter.convertToDTO(entity.getUser()));
        return specifiedTimeDTO;
    }
}
