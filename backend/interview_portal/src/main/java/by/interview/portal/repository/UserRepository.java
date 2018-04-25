package by.interview.portal.repository;

import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.EntityGraph.EntityGraphType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    /**
     * Finding user by login
     *
     * @param login Login of the user
     * @return found user or <code>null</code>
     */
    @EntityGraph(value = "User.userRoleDisciplines", type = EntityGraphType.LOAD)
    User findFirstByLogin(String login);

    @Override
    @EntityGraph(value = "User.userRoleDisciplines", type = EntityGraphType.LOAD)
    Page<User> findAll(Pageable pageable);

    @EntityGraph(value = "User.userRoleDisciplines", type = EntityGraphType.LOAD)
    @Query("SELECT user FROM User user left join user.userRoleDisciplines urd where urd.role = :role")
    Set<User> findAllByRole(@Param("role") Role role);

    @Query(" SELECT user FROM User user left join user.userRoleDisciplines urd where urd.role = :role and urd.discipline = :discipline")
    Set<User> findAllByRoleAndDiscipline(@Param("role") Role role,
            @Param("discipline") Discipline discipline);
}
