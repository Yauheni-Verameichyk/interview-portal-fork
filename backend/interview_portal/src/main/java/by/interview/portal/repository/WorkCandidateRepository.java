package by.interview.portal.repository;

import by.interview.portal.domain.WorkCandidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkCandidateRepository extends JpaRepository<WorkCandidate, Long> {

    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM work_candidate WHERE candidate_id IS NULL;")
    void removeWork();
}
