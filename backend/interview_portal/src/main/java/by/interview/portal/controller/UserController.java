package by.interview.portal.controller;

import java.util.ArrayList;
import java.util.List;

import by.interview.portal.dto.UserBaseInfoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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

//    @ResponseStatus(value = HttpStatus.OK)
//    @GetMapping
//    public HttpEntity<UserInfoDTO> findAll(){
//
//        return ResponseEntity.ok(userFacade.);
//    }
    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping
    public List<UserBaseInfoDTO> findAll() {
        return userFacade.findAllUserBaseInfo();
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping
    public void save(@RequestBody UserDTO userDTO) {
        userFacade.save(userDTO);
    }

}
