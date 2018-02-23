// package by.interview.portal.controller;
//
// import static org.junit.Assert.*;
//
// import by.interview.portal.dto.AuthenticationDTO;
// import by.interview.portal.dto.JwtUserDTO;
// import by.interview.portal.facade.UserFacade;
// import by.interview.portal.security.JwtTokenUtil;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.apache.logging.log4j.Level;
// import org.apache.logging.log4j.LogManager;
// import org.apache.logging.log4j.Logger;
// import org.junit.After;
// import org.junit.Before;
// import org.junit.Test;
// import org.junit.runner.RunWith;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.http.HttpEntity;
// import org.springframework.http.MediaType;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.test.context.support.WithAnonymousUser;
// import org.springframework.test.context.junit4.SpringRunner;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.MockMvcBuilder;
// import org.springframework.test.web.servlet.ResultActions;
// import org.springframework.test.web.servlet.setup.MockMvcBuilders;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.context.WebApplicationContext;
//
//
// import static org.mockito.Matchers.any;
// import static org.mockito.Matchers.eq;
// import static org.mockito.Mockito.when;
// import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
// import static org.assertj.core.api.Assertions.assertThat;
//
// @RunWith(SpringRunner.class)
// @SpringBootTest
// public class AuthenticationControllerTest {
//
// private MockMvc mockMvc;
//
// private static final Logger LOG = LogManager.getLogger(AuthenticationController.class);
//
// @Autowired
// private WebApplicationContext webApplicationContext;
//
// @Autowired
// private AuthenticationManager authenticationManager;
//
// @Autowired
// private JwtTokenUtil jwtTokenUtil;
//
// @Autowired
// private UserDetailsService userDetailsService;
// @Autowired
// private AuthenticationController authenticationController;
//
// @Before
// public void setup() {
// mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).apply(springSecurity()).build();
// }
//
// /**
// * BadRequest
// *
// * @throws Exception
// */
// @Test
// @WithAnonymousUser
// public void authorizationBadRequest() throws Exception {
// this.mockMvc.perform(post("/auth")
// .contentType(MediaType.APPLICATION_JSON)
// .content(new ObjectMapper().writeValueAsString(null)))
// .andExpect(status().isBadRequest());
// }
//
// @Test
// @WithAnonymousUser
// public void authorization() throws Exception {
// AuthenticationDTO authenticationDTO = new AuthenticationDTO();
// authenticationDTO.setLogin("awilliamson1@narod.ru");
// authenticationDTO.setPassword("awilliamson1@narod.ru");
// this.mockMvc.perform(post("/auth")
// .contentType(MediaType.APPLICATION_JSON)
// .content(new ObjectMapper().writeValueAsString(authenticationDTO)))
// .andExpect(status().is2xxSuccessful());
// }
//
// @Test
// @WithAnonymousUser
// public void authorizationToken() throws Exception {
// AuthenticationDTO authenticationDTO = new AuthenticationDTO();
// authenticationDTO.setLogin("awilliamson1@narod.ru");
// authenticationDTO.setPassword("awilliamson1@narod.ru");
// String token = authenticationController.authorization(authenticationDTO).getBody();
// JwtUserDTO userDTO = new JwtUserDTO();
// userDTO.setLogin("awilliamson1@narod.ru");
// userDTO.setPassword("awilliamson1@narod.ru");
// assertThat(jwtTokenUtil.validateToken(token, userDTO));
// LOG.log(Level.getLevel("TESTLEVEL"),"AuthenticationTokenTest; user: "+userDTO.getLogin());
//
// }
//
// }
