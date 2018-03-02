package by.interview.portal.facade.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import by.interview.portal.dto.FullUserInfoDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.User;
import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.dto.UserDTO;
import by.interview.portal.facade.UserFacade;
import by.interview.portal.service.UserService;

@Service
public class UserFacadeImpl implements UserFacade {

    @Autowired
    private UserService userService;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    @Qualifier("userConverter")
    private Converter<User, UserDTO> userConverter;

    @Override
    public List<UserDTO> findAll() {
        return userService.findAll().stream().filter(Objects::nonNull)
            .map(userConverter::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public void save(UserDTO userDTO) {
        userService.save(userConverter.convertToEntity(userDTO));
    }

    @Override
    public Optional<FullUserInfoDTO> findById(long userId) {
        return userService.findById(userId).map(userConverter::convertToDTO)
            .map(userDTO -> getFullUserInfoDTO(userDTO));
    }

    private FullUserInfoDTO getFullUserInfoDTO(UserDTO userDTO) {
        FullUserInfoDTO fullUserInfoDTO = modelMapper.map(userDTO, FullUserInfoDTO.class);
        fullUserInfoDTO.setRoles(userDTO.getRoleDisciplines().keySet());
        return fullUserInfoDTO;
    }

    @Override
    public List<UserBaseInfoDTO> findAllByRole(Role role) {
        return userService.findAllByRole(role).stream().filter(Objects::nonNull)
            .map(userConverter::convertToDTO).map(userDTO -> getUserBaseInfo(userDTO))
            .collect(Collectors.toList());
    }

    @Override
    public List<UserBaseInfoDTO> findAllUserBaseInfo() {
        return userService.findAll().stream().filter(Objects::nonNull)
            .map(userConverter::convertToDTO).map(userDTO -> getUserBaseInfo(userDTO))
            .collect(Collectors.toList());
    }

    private UserBaseInfoDTO getUserBaseInfo(UserDTO userDTO) {
        UserBaseInfoDTO userBaseInfoDTO = modelMapper.map(userDTO, UserBaseInfoDTO.class);
        userBaseInfoDTO.setRoles(userDTO.getRoleDisciplines().keySet());
        return userBaseInfoDTO;
    }
}
