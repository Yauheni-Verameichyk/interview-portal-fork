package by.interview.portal.controller;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import by.interview.portal.dto.AuthenticationDTO;
import by.interview.portal.dto.CredentialsDTO;
import by.interview.portal.facade.AuthenticationFacade;

@CrossOrigin
@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController {

    private static final Logger LOG = LogManager.getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationFacade authenticationFacade;


    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping
    public HttpEntity<CredentialsDTO> authorization(@RequestBody AuthenticationDTO request) {
        LOG.log(Level.getLevel("WORKLEVEL"),
                "User authentication through authenticationManager: user login -"
                        + request.getLogin());
        return ResponseEntity.ok(authenticationFacade.getUserPermission(request));
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping(value = "/refresh")
    public HttpEntity<CredentialsDTO> refreshCredentials(@RequestBody String refreshToken) {
        return ResponseEntity.ok(authenticationFacade.refreshCredentials(refreshToken));
    }

}

