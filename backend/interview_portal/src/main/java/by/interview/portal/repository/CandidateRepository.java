package by.interview.portal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.Candidate;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {

}
