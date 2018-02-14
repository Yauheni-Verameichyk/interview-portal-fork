package by.interview.portal.controller;

import by.interview.portal.dto.AuthenticationDTO;
import by.interview.portal.security.JwtTokenUtil;
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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping(value = "/auth")
public class AuthenticationController  {

    @Autowired
    private AuthenticationManager authenticationManager ;

    @Resource(name="userDetails")
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping
    public HttpEntity<String> authorization(@RequestBody AuthenticationDTO request){
        System.err.println("Controller");
        System.err.println("request.getLogin()" + request.getLogin());
        System.err.println("request.getPassword()" +  request.getPassword());

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                request.getLogin(),
                request.getPassword()
                ));
        System.err.println("authentication");
        SecurityContextHolder.getContext().setAuthentication(authentication);
// Reload password post-security so we can generate token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getLogin());
        final String token = jwtTokenUtil.generateToken(userDetails);
        System.err.println("token >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + token);
        // Return the token
        return ResponseEntity.ok(token);

    }
}
