package by.interview.portal.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import by.interview.portal.constant.JwtConstant;
import by.interview.portal.security.JwtTokenUtil;
import io.jsonwebtoken.ExpiredJwtException;

public class JwtAuthenticationTokenFilter extends OncePerRequestFilter {
	private static final Logger LOG = LogManager.getLogger(JwtAuthenticationTokenFilter.class);
	@Autowired
	UserDetailsService userDetailsService;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
			FilterChain filterChain) throws ServletException, IOException {
		LOG.log(Level.getLevel("WORKLEVEL"), "JwtAuthenticationTokenFilter start works");
		String header = httpServletRequest.getHeader(JwtConstant.HEADER_STRING);
		LOG.log(Level.getLevel("WORKLEVEL"), "JwtAuthenticationTokenFilter got header with content : " + header);
		String login = null;
		String authToken = null;
		if (header != null && header.startsWith(JwtConstant.TOKEN_PREFIX)) {
			LOG.log(Level.getLevel("WORKLEVEL"),
					"Header is not empty and Start with token prefix: " + JwtConstant.TOKEN_PREFIX);
			authToken = header.replace(JwtConstant.TOKEN_PREFIX, "");
			try {
				login = jwtTokenUtil.getloginFomToken(authToken);
				LOG.log(Level.getLevel("WORKLEVEL"), "Login to obtain from token success. login : " + login);
			} catch (IllegalArgumentException e) {
				LOG.error("an error occured during getting username from token", e);
			} catch (ExpiredJwtException e) {
				LOG.error("the token is expired and not valid anymore", e);
			}
		} else {
			LOG.error("couldn't find bearer string, will ignore the header");
		}
		LOG.log(Level.getLevel("WORKLEVEL"), "checking authentication for user " + login);
		if (login != null && SecurityContextHolder.getContext().getAuthentication() == null) {

			// It is not compelling necessary to load the use details from the database. You
			// could also store the information
			// in the token and read it from it. It's up to you ;)
			UserDetails userDetails = this.userDetailsService.loadUserByUsername(login);

			// For simple validation it is completely sufficient to just check the token
			// integrity. You don't have to call
			// the database compellingly. Again it's up to you ;)

			if (jwtTokenUtil.validateToken(authToken, userDetails)) {
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(httpServletRequest));
				LOG.log(Level.getLevel("WORKLEVEL"), "authenticated user " + login + ", setting security context");
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		}
		LOG.log(Level.getLevel("WORKLEVEL"), "move to next filter");
		filterChain.doFilter(httpServletRequest, httpServletResponse);
	}
}
