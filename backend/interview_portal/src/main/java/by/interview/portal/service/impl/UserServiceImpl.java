package by.interview.portal.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.interview.portal.domain.Role;
import by.interview.portal.domain.User;
import by.interview.portal.repository.UserRepository;
import by.interview.portal.repository.UserRoleDisciplineRepository;
import by.interview.portal.service.UserService;
import lombok.NonNull;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleDisciplineRepository userRoleDisciplineRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public void save(User user) {
        user = userRepository.save(user);
        userRoleDisciplineRepository.saveAll(user.getUserRoleDisciplines());
    }

    @Override
    public Optional<User> findById(@NonNull Long id) {
        return Optional.ofNullable(userRepository.getOne(id));
    }

    @Override
    @NonNull
    public Optional<User> findUserByLogin(String login) {
        return Optional.ofNullable(userRepository.findFirstByLogin(login));
    }

    @Override
    public Set<User> findAllByRole(Role role) {
        return userRepository.findAllByRole(role);
    }
}
