package by.interview.portal.controller;

import by.interview.portal.domain.Candidate;
import by.interview.portal.dto.CandidateDTO;
import by.interview.portal.facade.CandidateFacade;
import by.interview.portal.service.CandidateService;
import by.interview.portal.service.DisciplineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("candidates")
public class CandidateController {

    @Autowired
    private CandidateFacade candidateFacade;
    @Autowired
    private CandidateService candidateService;
    @Autowired
    private DisciplineService disciplineService;


    @GetMapping
    public ResponseEntity<List<CandidateDTO>> findAll(
        @RequestParam(name = "quantity",
            defaultValue = "0")
            Integer quantity
    ) {
        List<CandidateDTO> list = candidateFacade.findAll(quantity);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity add(
        @RequestBody
            Candidate candidate) {
        candidateService.add(candidate);
        return new ResponseEntity(HttpStatus.OK);
    }

}
