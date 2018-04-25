package by.interview.portal.controller;

import by.interview.portal.domain.Role;
import by.interview.portal.dto.FullUserInfoDTO;
import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.dto.UserDTO;
import by.interview.portal.facade.UserFacade;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping(value = "/users")
public class UserController {

    private static final Logger LOG = LogManager.getLogger(UserController.class);

    @Autowired
    private UserFacade userFacade;

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/{id}")
    public FullUserInfoDTO findById(@PathVariable Long id) {
        LOG.log(Level.getLevel("WORKLEVEL"), "Find user by userId: " + id);
        return userFacade.findById(id).get();
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping
    public Set<UserBaseInfoDTO> findAll(
        @RequestParam(name = "quantity", defaultValue = "0") Integer quantity,
        @RequestParam(name = "parameters", defaultValue = "") String parameters ) {
            LOG.log(Level.getLevel("WORKLEVEL"), "Find users, with limit: " + quantity);
            return  userFacade.findAllUserBaseInfo(quantity, parameters);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/role/{role}")
    public List<UserBaseInfoDTO> findByRole(@PathVariable Role role) {
        LOG.log(Level.getLevel("WORKLEVEL"), "Find users by role: " + role);
        return userFacade.findAllByRole(role);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping
    public void save(@RequestBody UserDTO userDTO) {
        LOG.log(Level.getLevel("WORKLEVEL"), "Save user, userDTO: " + userDTO);
        userFacade.save(userDTO);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable Long id) {
        LOG.log(Level.getLevel("WORKLEVEL"), "Delete user by id: " + id);
        userFacade.delete(id);
    }
}

