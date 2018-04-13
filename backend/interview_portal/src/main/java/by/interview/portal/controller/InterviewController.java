package by.interview.portal.controller;

import by.interview.portal.dto.FullInterviewInfoDTO;
import by.interview.portal.dto.InterviewDTO;
import by.interview.portal.facade.InterviewFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("interviews")
public class InterviewController {

    @Autowired
    private InterviewFacade interviewFacade;

    @GetMapping
    public List<InterviewDTO> findAll(
            @RequestParam(name = "quantity", defaultValue = "0") Integer quantity) {
        return interviewFacade.findAll(quantity);
    }

    @GetMapping("{id}")
    public FullInterviewInfoDTO findById(@PathVariable Long id) {
        return interviewFacade.findById(id);
    }

    @PostMapping
    public void add(@RequestBody FullInterviewInfoDTO interview) {
        interviewFacade.add(interview);
    }

    @PutMapping
    public void update(@RequestBody FullInterviewInfoDTO interview) {
        interviewFacade.update(interview);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        interviewFacade.delete(id);
    }

}
