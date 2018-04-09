package by.interview.portal.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.ExcludedTimeSlot;
import by.interview.portal.domain.User;

@Repository
public interface ExcludedTimeSlotRepository extends JpaRepository<ExcludedTimeSlot, Long> {

    List<ExcludedTimeSlot> findByStartTimeBetweenAndUser(LocalDateTime rangeStart,
            LocalDateTime rangeEnd, User user);
}
