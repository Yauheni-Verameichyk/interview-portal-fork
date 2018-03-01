package by.interview.portal.controller;

import java.util.List;

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

import by.interview.portal.domain.Role;
import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.dto.UserDTO;
import by.interview.portal.facade.UserFacade;

@CrossOrigin
@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserFacade userFacade;

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/{id}")
    public UserDTO findById(@PathVariable Long id) {
        return userFacade.findById(id).get();
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping
    public List<UserBaseInfoDTO> findAll() {
        return userFacade.findAllUserBaseInfo();
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/role/{role}")
    public List<UserBaseInfoDTO> findByRole(@PathVariable Role role) {
        return userFacade.findAllByRole(role);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping
    public void save(@RequestBody UserDTO userDTO) {
        userFacade.save(userDTO);
    }

}
