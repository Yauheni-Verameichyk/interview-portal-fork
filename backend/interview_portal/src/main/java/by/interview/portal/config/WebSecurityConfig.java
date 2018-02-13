package by.interview.portal.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


import by.interview.portal.filter.JwtAuthenticationTokenFilter;
import by.interview.portal.security.JwtAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity

public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	public void configureAuthentication(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(this.userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public JwtAuthenticationTokenFilter authenticationTokenFilterBean() throws Exception {
		return new JwtAuthenticationTokenFilter();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().exceptionHandling().authenticationEntryPoint(jwtAuthenticationEntryPoint).and()
				// don't create session
				.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
				// allow anonymous resource requests
				.antMatchers(HttpMethod.GET, "/", "/*.html", "/favicon.ico", "/**/*.html", "/**/*.css", "/**/*.js")
				.permitAll()
				// disable secure H2 Database
				.antMatchers("/h2-console/**/**").permitAll()

				.antMatchers("/auth/**").permitAll().anyRequest().authenticated();

		// Custom JWT based security filter
		http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);

		// disable page caching
		http.headers().frameOptions().sameOrigin() // required to set for H2 else H2 Console will be blank.
				.cacheControl();
	}
}
