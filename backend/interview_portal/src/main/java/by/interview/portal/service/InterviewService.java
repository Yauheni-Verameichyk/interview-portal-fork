package by.interview.portal.service;

import by.interview.portal.domain.Interview;

import java.util.List;

public interface InterviewService {

    List<Interview> findAll(Integer quantity);

    Interview findById(Long id);

    void add(Interview interview);

    void update(Interview interview);

    void delete(Long id);
}
