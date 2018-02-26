package by.interview.portal.converter.impl;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.User;
import by.interview.portal.dto.JwtUserDTO;
import by.interview.portal.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;


import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component("jwtUserConverter")
public final class JwtUserConverter implements Converter<User, JwtUserDTO> {

    @Autowired
    @Qualifier("userConverter")
    Converter<User, UserDTO> converter;

    private  List<GrantedAuthority> mapToGrantedAuthorities(User user) {

        return converter
            .convertToDTO(user)
            .getPermissions()
            .stream()
            .map(authority -> new SimpleGrantedAuthority(authority))
            .collect(Collectors.toList());
        /*return authorities.stream()
                .map(authority -> new SimpleGrantedAuthority("User"))
                .collect(Collectors.toList());*/
    }

    @Override
    public User convertToEntity(JwtUserDTO jwtUser) {
        User user = new User();
        user.setLogin(jwtUser.getLogin());
        user.setPassword(jwtUser.getPassword());
        return user;

    }

    @Override
    public JwtUserDTO convertToDTO(User user) {
        return new JwtUserDTO(
                user.getPassword(),
                user.getLogin(),
                mapToGrantedAuthorities(user),
                true);
    }
}
