package by.interview.portal.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.SpecifiedTime;

@Repository
public interface SpecifiedTimeRepository extends JpaRepository<SpecifiedTime, Long> {

    @Query(nativeQuery = true,
            value = "SELECT DISTINCT * FROM select_available_time_by_discipline( :rangeStart, :rangeEnd, :disciplineId)")
    List<SpecifiedTime> findAllInRange(@Param("rangeStart") LocalDateTime rangeStart,
            @Param("rangeEnd") LocalDateTime rangeEnd, @Param("disciplineId") Long disciplineId);

    @Query(nativeQuery = true,
            value = "SELECT DISTINCT * FROM select_specified_time_by_user( :rangeStart, :rangeEnd, :login)")
    List<SpecifiedTime> findAllForUserInRange(@Param("rangeStart") LocalDateTime rangeStart,
            @Param("rangeEnd") LocalDateTime rangeEnd, @Param("login") String login);

    void deleteByGroupId(Long id);
}
