package by.interview.portal.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import by.interview.portal.dto.AuthenticationDTO;
import by.interview.portal.dto.CredentialsDTO;
import by.interview.portal.facade.AuthenticationFacade;
import by.interview.portal.service.UserService;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
public class AuthenticationControllerTest {

    @Autowired
    private MockMvc mvc;

    @SpyBean
    private AuthenticationFacade authenticationFacade;

    @MockBean
    private UserService userService;

    private AuthenticationDTO authenticationDTO;

    private CredentialsDTO credentialsDTO;

    private CredentialsDTO refreshedCredentialsDTO;

    @Before
    public void doSetup() {
        authenticationDTO = new AuthenticationDTO();
        authenticationDTO.setLogin("awilliamson1@narod.ru");
        authenticationDTO.setPassword("awilliamson1@narod.ru");

        credentialsDTO = new CredentialsDTO();
        credentialsDTO.setAccessToken("accessToken");
        credentialsDTO.setRefreshToken("refreshToken");

        refreshedCredentialsDTO = new CredentialsDTO();
        refreshedCredentialsDTO.setAccessToken("newAccessToken");
        refreshedCredentialsDTO.setRefreshToken("newRefreshToken");
    }

    @Test
    public void authorizationBadRequest() throws Exception {
        mvc.perform(post("/auth").contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(null)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void userShouldLoginAndGetCredentials() throws Exception {
        doReturn(credentialsDTO).when(authenticationFacade).getUserPermission(authenticationDTO);
        mvc.perform(post("/auth").contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(authenticationDTO)))
                .andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.accessToken", is(credentialsDTO.getAccessToken())))
                .andExpect(jsonPath("$.refreshToken", is(credentialsDTO.getRefreshToken())));
    }

    @Test
    public void userShouldFailToLoginWithWrongCredentials() throws Exception {
        doReturn(null).when(userService).findUserByLogin(authenticationDTO.getLogin());
        mvc.perform(post("/auth").contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(authenticationDTO)))
                .andExpect(status().is(401));
    }

    @Test
    public void userShouldRefreshCredentials() throws Exception {
        doReturn(refreshedCredentialsDTO).when(authenticationFacade)
                .refreshCredentials(credentialsDTO.getRefreshToken());
        mvc.perform(post("/auth/refresh").contentType(MediaType.APPLICATION_JSON)
                .content(credentialsDTO.getRefreshToken())).andExpect(status().is2xxSuccessful())
                .andExpect(jsonPath("$.accessToken", is(refreshedCredentialsDTO.getAccessToken())))
                .andExpect(
                        jsonPath("$.refreshToken", is(refreshedCredentialsDTO.getRefreshToken())));
    }
}
