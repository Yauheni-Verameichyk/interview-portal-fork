package by.interview.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import by.interview.portal.domain.PermissionTemplate;
import by.interview.portal.facade.PermissionFacade;

@CrossOrigin
@RestController
@RequestMapping(value = "/permission")
public class PermissionController {

    @Autowired
    private PermissionFacade permissionFacade;

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping
    public void save(@RequestBody PermissionTemplate permissionTemplate) {
        permissionFacade.save(permissionTemplate);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/{id}")
    public PermissionTemplate findById(@PathVariable Long id) {
        return permissionFacade.findById(id);
    }
}
