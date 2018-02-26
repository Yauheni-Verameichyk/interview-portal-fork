package by.interview.portal.controller;

import by.interview.portal.domain.Candidate;
import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.EducationCandidate;
import by.interview.portal.domain.WorkCandidate;
import by.interview.portal.dto.CandidateDTO;
import by.interview.portal.dto.ListBean;
import by.interview.portal.facade.CandidateFacade;
import by.interview.portal.service.CandidateService;
import by.interview.portal.service.DisciplineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("candidate")
public class CandidateController {

    @Autowired
    private CandidateFacade candidateFacade;
    @Autowired
    private CandidateService candidateService;
    @Autowired
    private DisciplineService disciplineService;

    @GetMapping
    public ResponseEntity<ListBean<CandidateDTO>> findPage(
            @RequestParam(name = "page", defaultValue = "1") Integer page
    ) {
        ListBean<CandidateDTO> list = candidateFacade.findPage(page);
        return new ResponseEntity(list, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity add(@RequestBody Candidate candidate) {
        candidateService.add(candidate);
        return new ResponseEntity(HttpStatus.OK);
    }

}
