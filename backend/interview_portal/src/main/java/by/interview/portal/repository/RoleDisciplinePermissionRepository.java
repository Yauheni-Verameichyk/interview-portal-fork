package by.interview.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.RoleDisciplinePermission;

@Repository
public interface RoleDisciplinePermissionRepository extends JpaRepository<RoleDisciplinePermission, Long> {

}
