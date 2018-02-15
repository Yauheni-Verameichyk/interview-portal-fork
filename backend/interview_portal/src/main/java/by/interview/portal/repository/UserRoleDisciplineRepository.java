package by.interview.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.UserRoleDiscipline;

@Repository
public interface UserRoleDisciplineRepository extends JpaRepository<UserRoleDiscipline, Long> {

}
