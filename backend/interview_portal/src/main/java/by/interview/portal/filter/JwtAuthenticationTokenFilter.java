package by.interview.portal.filter;

import by.interview.portal.Constant.JwtConstant;
import by.interview.portal.security.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {

    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
        String header = httpServletRequest.getHeader(JwtConstant.HEADER_STRING);
        String login = null;
        String authToken = null;
        if(header != null && header.startsWith(JwtConstant.TOKEN_PREFIX)){
            authToken = header.replace(JwtConstant.TOKEN_PREFIX, "");
        }


    }
}
