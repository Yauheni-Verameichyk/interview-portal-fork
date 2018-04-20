package by.interview.portal.facade;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import by.interview.portal.domain.Role;
import by.interview.portal.dto.FullUserInfoDTO;
import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.dto.UserDTO;

public interface UserFacade {

    List<UserDTO> findAll(int quantity);

    void save(UserDTO user);

    Optional<FullUserInfoDTO> findById(long userId);

    List<UserBaseInfoDTO> findAllByRole(Role role);

    List<UserBaseInfoDTO> findAllUserBaseInfo(int page);

    void delete(Long userId);

    Set<UserBaseInfoDTO> findWithParameters(String search);
}
