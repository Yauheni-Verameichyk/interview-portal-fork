package by.interview.portal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.PermissionTemplate;

@Repository
public interface DisciplineRepository extends JpaRepository<Discipline, Long> {

	List<Discipline> findAllByParentId(Long id);

	PermissionTemplate findByName(String name);
}
