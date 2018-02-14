package by.interview.portal.converter.impl;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.User;
import by.interview.portal.dto.JwtUserDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;


import java.util.Arrays;
import java.util.List;
@Component("jwtUserConverter")
public final class JwtUserConverter implements Converter<User, JwtUserDTO> {

    private static List<GrantedAuthority> mapToGrantedAuthorities(/*List<Permission> authorities*/) {
        return Arrays.asList(new SimpleGrantedAuthority("User"));
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
                mapToGrantedAuthorities(),
                true);
    }
}
