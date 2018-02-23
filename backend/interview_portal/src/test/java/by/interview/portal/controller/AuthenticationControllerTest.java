package by.interview.portal.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import com.fasterxml.jackson.databind.ObjectMapper;

import by.interview.portal.dto.AuthenticationDTO;
import by.interview.portal.dto.CredentialsDTO;
import by.interview.portal.dto.JwtUserDTO;
import by.interview.portal.security.JwtTokenUtil;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AuthenticationControllerTest {

    private MockMvc mockMvc;

    private static final Logger LOG = LogManager.getLogger(AuthenticationController.class);

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationController authenticationController;

    @Before
    public void setup() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).apply(springSecurity())
                .build();
    }

    /**
     * BadRequest
     *
     * @throws Exception
     */
    @Test
    @WithAnonymousUser
    public void authorizationBadRequest() throws Exception {
        this.mockMvc
                .perform(post("/auth").contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(null)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @WithAnonymousUser
    public void authorization() throws Exception {
        AuthenticationDTO authenticationDTO = new AuthenticationDTO();
        authenticationDTO.setLogin("awilliamson1@narod.ru");
        authenticationDTO.setPassword("awilliamson1@narod.ru");
        this.mockMvc
                .perform(post("/auth").contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(authenticationDTO)))
                .andExpect(status().is2xxSuccessful());
    }

    @Test
    @WithAnonymousUser
    public void authorizationToken() throws Exception {
        AuthenticationDTO authenticationDTO = new AuthenticationDTO();
        authenticationDTO.setLogin("awilliamson1@narod.ru");
        authenticationDTO.setPassword("awilliamson1@narod.ru");
        CredentialsDTO credentialsDTO =
                authenticationController.authorization(authenticationDTO).getBody();
        JwtUserDTO userDTO = new JwtUserDTO();
        userDTO.setLogin("awilliamson1@narod.ru");
        userDTO.setPassword("awilliamson1@narod.ru");
        assertThat(jwtTokenUtil.validateToken(credentialsDTO.getAccessToken(), userDTO));
        LOG.log(Level.getLevel("TESTLEVEL"),
                "AuthenticationTokenTest; user: " + userDTO.getLogin());

    }

}
