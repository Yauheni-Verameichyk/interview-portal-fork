package by.interview.portal.service.impl;

import by.interview.portal.domain.Interview;
import by.interview.portal.repository.InterviewRepository;
import by.interview.portal.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class InterviewServiceImpl implements InterviewService {

    private static final Integer QUANTITY_ELEMENTS_IN_PAGE = 10;

    @Autowired
    private InterviewRepository interviewRepository;

    @Override
    public List<Interview> findAll(Integer quantity) {
        Integer page =
                (int) Math.ceil(quantity.doubleValue() / QUANTITY_ELEMENTS_IN_PAGE.doubleValue());
        return interviewRepository.findAll(PageRequest.of(page, QUANTITY_ELEMENTS_IN_PAGE))
                .getContent();
    }

    @Override
    public Interview findById(Long id) {
        return interviewRepository.findById(id).get();
    }

    @Override
    public void add(Interview interview) {
        interviewRepository.save(interview);
    }

    @Override
    public void update(Interview interview) {
        interviewRepository.save(interview);
    }

    @Override
    public void delete(Long id) {
        interviewRepository.deleteById(id);
    }

}
