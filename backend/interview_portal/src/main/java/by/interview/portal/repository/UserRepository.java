package by.interview.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Finding user by login
     *
     * @param login Login of the user
     * @return found user or <code>null</code>
     */
    User findFirstByLogin(String login);
}
