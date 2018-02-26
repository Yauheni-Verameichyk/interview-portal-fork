package by.interview.portal.controller;

import java.util.HashSet;

import javax.annotation.Resource;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import by.interview.portal.dto.AuthenticationDTO;
import by.interview.portal.dto.CredentialsDTO;
import by.interview.portal.security.JwtTokenUtil;

@CrossOrigin
@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController {

    private static final Logger LOG = LogManager.getLogger(AuthenticationController.class);
    @Autowired
    private AuthenticationManager authenticationManager;

    @Resource(name = "userDetails")
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping
    public HttpEntity<CredentialsDTO> authorization(@RequestBody AuthenticationDTO request) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // Reload password post-security so we can generate token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getLogin());
        final String token = jwtTokenUtil.generateToken(userDetails);
        // Return the token

        if (jwtTokenUtil.validateToken(token, userDetails)) {
            LOG.log(Level.getLevel("WORKLEVEL"), "Authentication; user: " + request.getLogin());
        }
        CredentialsDTO credentialsDTO = new CredentialsDTO();
        credentialsDTO.setAccessToken(token);
        credentialsDTO.setCredentials(new HashSet<String>());
        credentialsDTO.setRefreshToken("RefreshToken");
        return ResponseEntity.ok(credentialsDTO);

    }
}