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
    // "SELECT u FROM USERS U WHERE u.DATEOFBIRTH BETWEEN "+ dateOfBirthSearch1 + " and " + dateOfBirthSearch2
    // @Query("SELECT urd.discipline FROM UserRoleDiscipline urd where urd.user.login = :login and
    // urd.discipline.parentId is null")

    @Query("SELECT st FROM SpecifiedTime st where (( :requiredDate = st.startTime))")
    List<SpecifiedTime> findAllInDate(@Param("requiredDate") LocalDateTime requiredDate);
}
