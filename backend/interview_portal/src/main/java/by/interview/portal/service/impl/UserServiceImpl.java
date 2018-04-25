package by.interview.portal.service.impl;

import by.interview.portal.domain.Role;
import by.interview.portal.domain.User;
import by.interview.portal.repository.UserRepository;
import by.interview.portal.repository.UserRoleDisciplineRepository;
import by.interview.portal.service.UserService;
import by.interview.portal.utils.search.SearchUtils;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import static by.interview.portal.constant.PageConstant.QUANTITY_ELEMENTS_IN_PAGE;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleDisciplineRepository userRoleDisciplineRepository;

    @Override
    public Set<User> findAll(Integer quantity, String searchParameters) {
        int pageCount = (int) Math.ceil(quantity.doubleValue() / QUANTITY_ELEMENTS_IN_PAGE.doubleValue());
        return userRepository.findAll(SearchUtils.getSearchSpecifications(searchParameters), PageRequest.of(pageCount, QUANTITY_ELEMENTS_IN_PAGE))
                .getContent().stream().collect(Collectors.toSet());
    }

    @Override
    public void save(User user) {
        if (user.getPassword() == null && user.getId() != null) {
            User userExist = findById(user.getId()).get();
            user.setPassword(userExist.getPassword());
            userRoleDisciplineRepository.deleteAll(userExist.getUserRoleDisciplines());
            user.setUserRoleDisciplines(
                    userRoleDisciplineRepository.saveAll(user.getUserRoleDisciplines()));
            user = userRepository.save(user);
        } else {
            user = userRepository.save(user);
            userRoleDisciplineRepository.saveAll(user.getUserRoleDisciplines());
        }
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

    @Override
    public void delete(Long userId) {
        userRoleDisciplineRepository.deleteByUserId(userId);
        userRepository.deleteById(userId);
    }

    @Override public Set<User> findUserWithParameters(String searchParameters) {
        return userRepository.findAll(SearchUtils.getSearchSpecifications(searchParameters))
            .stream()
            .collect(Collectors.toSet());
    }
}
