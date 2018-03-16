package by.interview.portal.controller;


import by.interview.portal.domain.Candidate;
import by.interview.portal.domain.Discipline;
import by.interview.portal.dto.CandidateDTO;
import by.interview.portal.facade.CandidateFacade;
import by.interview.portal.service.CandidateService;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

@WithMockUser(username = "user1", password = "user1")
@RunWith(SpringRunner.class)
@WebMvcTest(CandidateController.class)
public class CandidateControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CandidateFacade candidateFacade;

    @MockBean
    private CandidateService candidateService;

    private CandidateDTO candidateDTO;

    private Candidate candidate;

    @Before
    public void beforeTest() {
        candidateDTO = new CandidateDTO(1L, "Viktor", "Hrynko", "+3754454745414", null);
        Discipline discipline = new Discipline(1L, "Java", "Best of the best!!", null);
        candidate = new Candidate(2L, "Eugene", " Veremeichik", "+3454145544",
                Stream.of(discipline).collect(Collectors.toSet()), null, null);
    }

    @Test
    public void shouldUpdateCandidate() throws Exception {
        doNothing().when(candidateService).update(candidate);
        ObjectMapper objectMapper = new ObjectMapper();
        mockMvc.perform(put("/candidates").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(candidate))).andExpect(status().isOk());
        verify(candidateService, times(1)).update(candidate);
    }

    @Test
    public void shouldReturnCandidateDTOList() throws Exception {
        given(candidateFacade.findAll(0)).willReturn(Arrays.asList(candidateDTO));
        mockMvc.perform(get("/candidates?quantity=0").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is(candidateDTO.getName())));
    }

    @Test
    public void shouldReturnCandidateById() throws Exception {
        given(candidateService.findById(1L)).willReturn(candidate);
        mockMvc.perform(get("/candidates/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$.name", is(candidate.getName())));
    }

    @Test
    public void shouldCreateCandidate() throws Exception {
        doNothing().when(candidateService).add(candidate);
        ObjectMapper objectMapper = new ObjectMapper();
        byte[] requestJson = objectMapper.writeValueAsBytes(candidate);
        mockMvc.perform(
                post("/candidates").contentType(MediaType.APPLICATION_JSON).content(requestJson))
                .andExpect(status().isOk());
        verify(candidateService, times(1)).add(candidate);
    }

}
