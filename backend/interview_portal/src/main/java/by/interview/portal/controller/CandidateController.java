package by.interview.portal.controller;

import by.interview.portal.domain.Candidate;
import by.interview.portal.dto.CandidateDTO;
import by.interview.portal.facade.CandidateFacade;
import by.interview.portal.service.CandidateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@ResponseStatus(HttpStatus.OK)
@RequestMapping("candidates")
public class CandidateController {

    @Autowired
    private CandidateFacade candidateFacade;
    @Autowired
    private CandidateService candidateService;

    @GetMapping
    public List<CandidateDTO> findAll(
            @RequestParam(name = "quantity", defaultValue = "0") Integer quantity) {
        return candidateFacade.findAll(quantity);
    }

    @GetMapping("{id}")
    public Candidate findById(@PathVariable Long id){
        return candidateService.findById(id);
    }

    @PostMapping
    public void add(@RequestBody Candidate candidate) {
        candidateService.add(candidate);
    }

    @PutMapping
    public void update(@RequestBody Candidate candidate) {
        candidateService.update(candidate);
    }


}
