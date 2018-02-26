package by.interview.portal.controller;

import java.util.ArrayList;
import java.util.List;

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
    public List<UserDTO> findAll() {
        return userFacade.findAll();

    }

    @ResponseStatus(value = HttpStatus.OK)
    @PutMapping
    public void save(@RequestBody UserDTO userDTO) {
        userFacade.save(userDTO);
    }

    // private UserDTO geUserDTO() {
    // UserDTO userDTO = new UserDTO();
    // userDTO.setId(1);
    // userDTO.setName("Eugene");
    // userDTO.setEmail("sgfg");
    // userDTO.setPassword("gdf");
    // userDTO.setPhoneNumber("dfgsg");
    // userDTO.setSurname("dghgh");
    //
    // Map<Role, List<Discipline>> rd = new HashMap<>();
    // Discipline discipline = new Discipline();
    // discipline.setId(1);
    // discipline.setName("Java");
    // List<Discipline> lDisciplines = new ArrayList<>();
    // lDisciplines.add(discipline);
    // rd.put(Role.DISCIPLINE_HEAD, lDisciplines);
    // rd.put(Role.COORDINATOR, null);
    // userDTO.setRoleDisciplines(rd);
    // return userDTO;
    // }
}
