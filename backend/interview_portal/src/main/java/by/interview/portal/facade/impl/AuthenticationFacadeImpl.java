package by.interview.portal.facade.impl;

import java.util.stream.Collectors;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import by.interview.portal.dto.AuthenticationDTO;
import by.interview.portal.dto.CredentialsDTO;
import by.interview.portal.dto.JwtUserDTO;
import by.interview.portal.facade.AuthenticationFacade;
import by.interview.portal.security.JwtTokenUtil;

@Service
public class AuthenticationFacadeImpl implements AuthenticationFacade {
    private static final Logger LOG = LogManager.getLogger(AuthenticationFacadeImpl.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    public CredentialsDTO getUserPermission(AuthenticationDTO request) {
        LOG.log(Level.getLevel("WORKLEVEL"), "Method started to work 'getUserPermission' ");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getLogin(), request.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final String token = jwtTokenUtil.generateToken((JwtUserDTO) authentication.getPrincipal());
        LOG.log(Level.getLevel("WORKLEVEL"),
                "User " + authentication.getName() + " got access token: " + token);
        final String refreshToken = jwtTokenUtil.refreshToken(token);
        LOG.log(Level.getLevel("WORKLEVEL"),
                "User " + authentication.getName() + " got refresh token: " + refreshToken);
        return gatherPermissions(token, refreshToken, authentication);
    }

    @Override
    public CredentialsDTO refreshCredentials(String oldRefreshToken) {
        LOG.log(Level.getLevel("WORKLEVEL"), "Method started to work 'refreshCredentials' ");
        String login = jwtTokenUtil.getloginFomToken(oldRefreshToken);
        LOG.log(Level.getLevel("WORKLEVEL"), "Login extracted : " + login);
        JwtUserDTO jwtUserDTO = (JwtUserDTO) userDetailsService.loadUserByUsername(login);
        LOG.log(Level.getLevel("WORKLEVEL"), "We got userDetails");
        final String token = jwtTokenUtil.generateToken(jwtUserDTO);
        LOG.log(Level.getLevel("WORKLEVEL"), "User  got access token: " + token);
        final String refreshToken = jwtTokenUtil.refreshToken(token);
        LOG.log(Level.getLevel("WORKLEVEL"), "User got refresh token: " + refreshToken);
        return gatherNewPermissions(token, refreshToken, jwtUserDTO);
    }

    private CredentialsDTO gatherNewPermissions(String token, String refreshToken,
            JwtUserDTO jwtUserDTO) {
        LOG.log(Level.getLevel("WORKLEVEL"), "Method started to work  'gatherNewPermissions' ");
        CredentialsDTO credentialsDTO = new CredentialsDTO();
        credentialsDTO.setAccessToken(token);
        credentialsDTO.setPermissions(jwtUserDTO.getAuthorities().stream()
                .map(permissions -> permissions.getAuthority()).collect(Collectors.toSet()));
        credentialsDTO.setRefreshToken(refreshToken);
        LOG.log(Level.getLevel("WORKLEVEL"), "return permissions in CredentialsDTO");
        return credentialsDTO;
    }

    private CredentialsDTO gatherPermissions(String token, String refreshToken,
            Authentication authentication) {
        LOG.log(Level.getLevel("WORKLEVEL"), "Method started to work 'gatherPermissions' ");
        CredentialsDTO credentialsDTO = new CredentialsDTO();
        credentialsDTO.setAccessToken(token);
        credentialsDTO.setPermissions(authentication.getAuthorities().stream()
                .map(permission -> permission.getAuthority()).collect(Collectors.toSet()));
        credentialsDTO.setRefreshToken(refreshToken);
        LOG.log(Level.getLevel("WORKLEVEL"), "return permissions in CredentialsDTO");
        return credentialsDTO;
    }


}

