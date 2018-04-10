package by.interview.portal.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.Discipline;

@Repository
public interface DisciplineRepository
        extends JpaRepository<Discipline, Long>, JpaSpecificationExecutor<Discipline> {

    List<Discipline> findAllByParentId(Long id);

    Page<Discipline> findAllByParentId(@Param("parentId") Long parentId, Pageable pageable);

    Discipline findByName(String name);

    @Query("SELECT urd.discipline FROM UserRoleDiscipline urd where urd.user.login = :login and urd.discipline.parentId is null")
    Set<Discipline> findDisciplinesByUser(@Param("login") String login);
}
