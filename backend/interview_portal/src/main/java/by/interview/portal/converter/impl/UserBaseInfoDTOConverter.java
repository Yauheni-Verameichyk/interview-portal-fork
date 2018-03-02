package by.interview.portal.converter.impl;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.User;
import by.interview.portal.dto.UserBaseInfoDTO;

@Component("userBaseInfoDTOConverter")
public class UserBaseInfoDTOConverter implements Converter<User, UserBaseInfoDTO> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public User convertToEntity(UserBaseInfoDTO userDTO) {
        return modelMapper.map(userDTO, User.class);
    }

    @Override
    public UserBaseInfoDTO convertToDTO(User user) {
        return modelMapper.map(user, UserBaseInfoDTO.class);
    }
}
