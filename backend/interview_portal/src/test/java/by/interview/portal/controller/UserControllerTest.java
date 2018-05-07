package by.interview.portal.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.dto.FullUserInfoDTO;
import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.facade.UserFacade;
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

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@WithMockUser(username = "user1", password = "user1")
@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
public class UserControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private UserFacade userFacade;

    private FullUserInfoDTO fullUserInfoDTO;

    private UserBaseInfoDTO userBaseInfoDTO;

    @Before
    public void doSetup() {
        createFullUserInfoDTO();
        userBaseInfoDTO = new UserBaseInfoDTO((long) 1, "Vasia", "Pupkin",
                Stream.of(Role.DISCIPLINE_HEAD).collect(Collectors.toSet()));
    }

    @Test
    public void shouldReturnUserById() throws Exception {
        given(userFacade.findById(1)).willReturn(Optional.of(fullUserInfoDTO));
        mvc.perform(get("/users/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is(fullUserInfoDTO.getName())))
                .andExpect(jsonPath("$.login", is(fullUserInfoDTO.getLogin())))
                .andExpect(jsonPath("$.roleDisciplines.DISCIPLINE_HEAD[0].name", is("Java")));
    }

    @Test
    public void shouldReturnAllUsersList() throws Exception {
        given(userFacade.findAllUserBaseInfo(0, ""))
            .willReturn(Arrays.asList(userBaseInfoDTO)
                .stream()
                .collect(Collectors.toSet()));
        mvc.perform(get("/users").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is(userBaseInfoDTO.getName())))
                .andExpect(jsonPath("$[0].surname", is(userBaseInfoDTO.getSurname())));
    }

    @Test
    public void shouldReturnAllUsersListByDiscipline() throws Exception {
        given(userFacade.findAllByRole(Role.DISCIPLINE_HEAD))
                .willReturn(Arrays.asList(userBaseInfoDTO));
        mvc.perform(get("/users/role/DISCIPLINE_HEAD").contentType(MediaType.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is(userBaseInfoDTO.getName())))
                .andExpect(jsonPath("$[0].surname", is(userBaseInfoDTO.getSurname())));
    }
    @Test
    public void shouldReturnUsersBySearchParameters() throws Exception {
        given(userFacade.findAllUserBaseInfo(0, "userRoleDisciplines%23DISCIPLINE_HEAD"))
            .willReturn(Arrays.asList(userBaseInfoDTO)
                .stream()
                .collect(Collectors.toSet()));
        mvc.perform(get("/users")
            .param("quantity", "0")
            .param("parameters", "userRoleDisciplines%23DISCIPLINE_HEAD" )
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect((jsonPath("$", hasSize(1))))
            .andExpect(jsonPath("$[0].name", is(userBaseInfoDTO.getName())))
            .andExpect(jsonPath("$[0].surname", is(userBaseInfoDTO.getSurname())))
            .andExpect(jsonPath("$[0].roles[0]", is("DISCIPLINE_HEAD")));
    }

    private void createFullUserInfoDTO() {
        fullUserInfoDTO = new FullUserInfoDTO();
        fullUserInfoDTO.setId((long) 1);
        fullUserInfoDTO.setName("Eugene");
        fullUserInfoDTO.setLogin("sgfg");
        fullUserInfoDTO.setPhoneNumber("dfgsg");
        fullUserInfoDTO.setSurname("dghgh");

        Map<Role, List<Discipline>> rd = new HashMap<>();
        Discipline discipline = new Discipline();
        discipline.setId(1);
        discipline.setName("Java");
        List<Discipline> lDisciplines = new ArrayList<>();
        lDisciplines.add(discipline);
        rd.put(Role.DISCIPLINE_HEAD, lDisciplines);
        rd.put(Role.COORDINATOR, null);
        fullUserInfoDTO.setRoleDisciplines(rd);
    }
}
