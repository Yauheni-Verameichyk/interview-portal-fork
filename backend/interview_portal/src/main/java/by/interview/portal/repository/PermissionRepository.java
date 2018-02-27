package by.interview.portal.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.PermissionTemplate;
import by.interview.portal.domain.Role;

@Repository
public interface PermissionRepository extends JpaRepository<PermissionTemplate, Long> {

	List<PermissionTemplate> findAllByRolesIn(Set<Role> role);
}
