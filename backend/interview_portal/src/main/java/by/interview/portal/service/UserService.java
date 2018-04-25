package by.interview.portal.service;

import by.interview.portal.domain.Role;
import by.interview.portal.domain.User;
import org.springframework.lang.NonNull;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface UserService {

    Set<User> findAll(Integer quantity, String searchParameters);

    void save(User user);

    Optional<User> findById(Long userId);

    @NonNull Optional<User> findUserByLogin(@NonNull String login);

    Set<User> findAllByRole(Role role);

    void delete(Long userId);

    Set<User> findUserWithParameters(String searchParameters);
}
