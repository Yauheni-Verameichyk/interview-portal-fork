package by.interview.portal.repository;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.RoleDisciplinePermission;

@Repository
public interface CustomRoleDisciplinePermissionRepository {
	List<RoleDisciplinePermission> findRoleDisciplinePermissions(Map<Role, List<Discipline>> roleDisciplinesMap);
}
