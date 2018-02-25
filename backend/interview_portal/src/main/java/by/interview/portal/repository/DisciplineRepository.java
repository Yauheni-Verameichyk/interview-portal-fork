package by.interview.portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.Discipline;

@Repository
public interface DisciplineRepository extends JpaRepository<Discipline, Long> {

	List<Discipline> findAllByParentId(Long id);

	Discipline findByName(String name);

	@Query("SELECT urd.discipline FROM UserRoleDiscipline urd where urd.user.login = :login and urd.discipline.parentId is null")
	List<Discipline> findDisciplinesByUser(@Param("login") String login);
}
