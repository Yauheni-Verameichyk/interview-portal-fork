package by.interview.portal.repository;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.UserRoleDiscipline;

@Repository
public interface CustomUserRoleDisciplineRepository {
    List<UserRoleDiscipline> findUserRoleDisciplines(
            Map<Role, List<Discipline>> roleDisciplinesMap);
}
