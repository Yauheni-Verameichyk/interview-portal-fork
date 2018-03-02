package by.interview.portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.UserRoleDiscipline;

@Repository
public interface UserRoleDisciplineRepository extends JpaRepository<UserRoleDiscipline, Long> {

    List<UserRoleDiscipline> findAllByRoleAndDiscipline(Role role, Discipline discipline);
}
