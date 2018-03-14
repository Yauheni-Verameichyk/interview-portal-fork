package by.interview.portal.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import by.interview.portal.dto.AuthenticationDTO;
import by.interview.portal.dto.CredentialsDTO;
import by.interview.portal.facade.AuthenticationFacade;

@WithMockUser
@RunWith(SpringRunner.class)
@WebMvcTest(AuthenticationController.class)
public class AuthenticationControllerTest {

	@Autowired
	private MockMvc mvc;

	@MockBean
	private AuthenticationFacade authenticationFacade;

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
				.content(new ObjectMapper().writeValueAsString(null))).andExpect(status().isBadRequest());
	}

	@Test
	public void userShouldLoginAndGetCredentials() throws Exception {
		given(authenticationFacade.getUserPermission(authenticationDTO)).willReturn(credentialsDTO);
		mvc.perform(post("/auth").contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(authenticationDTO)))
				.andExpect(status().is2xxSuccessful())
				.andExpect(jsonPath("$.accessToken", is(credentialsDTO.getAccessToken())))
				.andExpect(jsonPath("$.refreshToken", is(credentialsDTO.getRefreshToken())));
	}

	@Test
	public void userShouldRefreshCredentials() throws Exception {
		given(authenticationFacade.refreshCredentials(credentialsDTO.getRefreshToken()))
				.willReturn(refreshedCredentialsDTO);
		mvc.perform(
				post("/auth/refresh").contentType(MediaType.APPLICATION_JSON).content(credentialsDTO.getRefreshToken()))
				.andExpect(status().is2xxSuccessful())
				.andExpect(jsonPath("$.accessToken", is(refreshedCredentialsDTO.getAccessToken())))
				.andExpect(jsonPath("$.refreshToken", is(refreshedCredentialsDTO.getRefreshToken())));
	}
}
