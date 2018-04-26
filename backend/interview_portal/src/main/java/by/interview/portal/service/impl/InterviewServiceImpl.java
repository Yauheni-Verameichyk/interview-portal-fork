package by.interview.portal.service.impl;

import by.interview.portal.domain.Interview;
import by.interview.portal.repository.InterviewRepository;
import by.interview.portal.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static by.interview.portal.constant.PageConstant.QUANTITY_ELEMENTS_IN_PAGE;

@Service
@Transactional
public class InterviewServiceImpl implements InterviewService {

    @Autowired
    private InterviewRepository interviewRepository;

    @Override
    public List<Interview> findAll(Integer quantity) {
        Integer page =
                (int) Math.ceil(quantity.doubleValue() / QUANTITY_ELEMENTS_IN_PAGE.doubleValue());
        return interviewRepository
                .findAll(PageRequest.of(page, QUANTITY_ELEMENTS_IN_PAGE, orderBy())).getContent();
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

    private Sort orderBy() {
        return new Sort(Sort.Direction.DESC, "startTime");
    }

}
