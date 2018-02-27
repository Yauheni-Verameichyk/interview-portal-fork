package by.interview.portal.facade;

import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserFacade {

    List<UserDTO> findAll();

    void save(UserDTO user);

    Optional<UserDTO> findById(long userId);

    List<UserBaseInfoDTO> findAllUserBaseInfo();
}
