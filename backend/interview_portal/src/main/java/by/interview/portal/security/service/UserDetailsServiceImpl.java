package by.interview.portal.security.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.User;
import by.interview.portal.dto.JwtUserDTO;
import by.interview.portal.service.UserService;

@Service("userDetails")
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    @Qualifier("jwtUserConverter")
    private Converter<User, JwtUserDTO> converter;

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        Optional<User> user = userService.findUserByLogin(login);
        return converter.convertToDTO(user.get());
    }
}
