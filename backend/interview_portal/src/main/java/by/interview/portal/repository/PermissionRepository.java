package by.interview.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.Permission;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, Long> {

	Permission findByName(String name);
}
