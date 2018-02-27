package by.interview.portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.facade.UserFacade;
import by.interview.portal.service.DisciplineService;

@CrossOrigin
@RestController
@RequestMapping(value = "/discipline")
public class DisciplineController {

    @Autowired
    private DisciplineService disciplineService;

    @Autowired
    private UserFacade userFacade;

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping
    public List<Discipline> findAll() {
        return disciplineService.findByParentId(null);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/{id}")
    public List<Discipline> findSubItems(@PathVariable Long id) {
        return disciplineService.findByParentId(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping
    public void save(@RequestBody Discipline discipline) {
        System.err.println(discipline);
        System.err.println(userFacade.findAllByRole(Role.DISCIPLINE_HEAD));
        // disciplineService.save(discipline);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/user")
    public List<Discipline> findDisciplinesForUser() {
        return disciplineService.findDisciplinesByUser(((UserDetails) SecurityContextHolder
                .getContext().getAuthentication().getPrincipal()).getUsername());
    }

}
