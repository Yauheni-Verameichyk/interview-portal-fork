package by.interview.portal.service;

import by.interview.portal.domain.User;
import by.interview.portal.dto.UserDTO;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> findAll();

    void save(User user);

    Optional<User> findById(long userId);

    @NonNull
    Optional<User> findUserByLogin(@NonNull String login);
}
