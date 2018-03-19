package by.interview.portal.repository;

import by.interview.portal.domain.CandidateEducation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateEducationRepository extends JpaRepository<CandidateEducation, Long>{

    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM education_candidate WHERE candidate_id IS NULL;")
    void removeEducation();

}
