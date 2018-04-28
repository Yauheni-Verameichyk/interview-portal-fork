package by.interview.portal.repository;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.Interview;

@Repository
public interface InterviewRepository extends JpaRepository<Interview, Long> {

    @Query("SELECT interview FROM Interview interview left join interview.interviewerSet interviewer where interviewer.login = :login and interview.startTime between :rangeStart and :rangeEnd ")
    Set<Interview> findByStartTimeBetweenAndUser(@Param("rangeStart") LocalDateTime rangeStart,
            @Param("rangeEnd") LocalDateTime rangeEnd, @Param("login") String login);
}
