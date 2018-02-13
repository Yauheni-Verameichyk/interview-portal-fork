package by.interview.portal.service;

import by.interview.portal.domain.User;
import by.interview.portal.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> findAll();

    void save(User user);

    Optional<User> findById(long userId);
}
