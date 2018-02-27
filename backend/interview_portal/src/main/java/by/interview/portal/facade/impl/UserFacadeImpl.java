package by.interview.portal.facade.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import by.interview.portal.dto.UserBaseInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.User;
import by.interview.portal.dto.UserDTO;
import by.interview.portal.facade.UserFacade;
import by.interview.portal.service.UserService;

@Service
public class UserFacadeImpl implements UserFacade {

    @Autowired
    private UserService userService;

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
    public Optional<UserDTO> findById(long userId) {
        return userService.findById(userId).map(userConverter::convertToDTO);
    }

    @Override
    public List<UserBaseInfoDTO> findAllUserBaseInfo() {
        return userService.findAll().stream().filter(Objects::nonNull)
            .map(userConverter::convertToDTO)
            .map(userDTO ->  getUserBaseInfo(userDTO))
            .collect(Collectors.toList());
    }

    private UserBaseInfoDTO getUserBaseInfo(UserDTO userDTO) {
        UserBaseInfoDTO userBaseInfo = new UserBaseInfoDTO();
        userBaseInfo.setId(userDTO.getId());
        userBaseInfo.setName(userDTO.getName());
        userBaseInfo.setSurname(userDTO.getSurname());
        userBaseInfo.setRoles(userDTO.getRoleDisciplines().keySet());
        return userBaseInfo;
    }
}
