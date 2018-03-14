package by.interview.portal.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;

import by.interview.portal.domain.Role;
import by.interview.portal.dto.DisciplineDTO;
import by.interview.portal.dto.DisciplineWithHeadsDTO;
import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.facade.DisciplineFacade;

@WithMockUser(username = "user1", password = "user1")
@RunWith(SpringRunner.class)
@WebMvcTest(DisciplineController.class)
public class DisciplineControllerTest {

	@Autowired
	private MockMvc mvc;

	@MockBean
	private DisciplineFacade disciplineFacade;

	private DisciplineDTO disciplineDTO;

	private DisciplineWithHeadsDTO disciplineWithHeadsDTO;

	private DisciplineDTO subItem;

	@Before
	public void doSetup() {
		disciplineDTO = new DisciplineDTO((long) 1, "Name", "Description", null, true);

		UserBaseInfoDTO userBaseInfoDTO = new UserBaseInfoDTO((long) 1, "Vasia", "Pupkin",
				Stream.of(Role.DISCIPLINE_HEAD).collect(Collectors.toSet()));

		disciplineWithHeadsDTO = new DisciplineWithHeadsDTO(1, "Name", "Description", null, null,
				Stream.of(userBaseInfoDTO).collect(Collectors.toSet()));

		subItem = new DisciplineDTO((long) 2, "SubName", "Description", (long) 2, false);
	}

	@Test
	public void shouldReturnAllDisciplinesList() throws Exception {
		given(disciplineFacade.findByParentId(null)).willReturn(Arrays.asList(disciplineDTO));
		mvc.perform(get("/discipline").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(1))).andExpect(jsonPath("$[0].name", is(disciplineDTO.getName())));
	}

	@Test
	public void shouldReturnDisciplineWithHeadsById() throws Exception {
		given(disciplineFacade.findById((long) 1)).willReturn(disciplineWithHeadsDTO);
		mvc.perform(get("/discipline/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$.name", is(disciplineDTO.getName())))
				.andExpect(jsonPath("$.disciplineHeadsList[0].name", is("Vasia")));
	}

	@Test
	public void shouldReturnSubItemsList() throws Exception {
		given(disciplineFacade.findByParentId((long) 1)).willReturn(Arrays.asList(subItem));
		mvc.perform(get("/discipline/parents/1").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(1))).andExpect(jsonPath("$[0].name", is(subItem.getName())));
	}

	@Test
	public void shouldSaveDiscipline() throws Exception {
		doNothing().when(disciplineFacade).save(disciplineWithHeadsDTO);
		ObjectMapper objectMapper = new ObjectMapper();
		byte[] requestJson = objectMapper.writeValueAsBytes(disciplineWithHeadsDTO);
		mvc.perform(post("/discipline").contentType(MediaType.APPLICATION_JSON).content(requestJson))
				.andExpect(status().isOk());
		verify(disciplineFacade, times(1)).save(disciplineWithHeadsDTO);
	}

	@Test
	public void shouldReturnDisciplinesListForUser() throws Exception {
		given(disciplineFacade.findDisciplinesByUser("user1")).willReturn(Arrays.asList(disciplineDTO));
		mvc.perform(get("/discipline/user").contentType(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$", hasSize(1))).andExpect(jsonPath("$[0].name", is(disciplineDTO.getName())));
	}

	@Test
	public void shouldDeleteDiscipline() throws Exception {
		doNothing().when(disciplineFacade).deleteDiscipline((long) 1);
		mvc.perform(delete("/discipline/1")).andExpect(status().isOk());
		verify(disciplineFacade, times(1)).deleteDiscipline((long) 1);
	}
}
