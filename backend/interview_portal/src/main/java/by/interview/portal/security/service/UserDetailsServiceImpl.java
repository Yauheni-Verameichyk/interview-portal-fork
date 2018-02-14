package by.interview.portal.security.service;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.User;
import by.interview.portal.converter.impl.JwtUserConverter;
import by.interview.portal.dto.JwtUserDTO;
import by.interview.portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service("userDetails")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    @Qualifier("jwtUserConverter")
    private Converter converter;

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Optional<User> user = userService.findUserByLogin(login);
        System.err.println("Entity "+user.get().toString());
        System.err.println(converter.convertToDTO(user.get()));
        return (UserDetails) converter.convertToDTO(user.get());
    }
}
