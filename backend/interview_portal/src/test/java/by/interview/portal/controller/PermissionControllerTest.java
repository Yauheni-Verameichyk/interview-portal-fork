package by.interview.portal.controller;

import static org.hamcrest.CoreMatchers.is;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.HashSet;
import java.util.Set;

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

import by.interview.portal.domain.Operation;
import by.interview.portal.domain.PermissionName;
import by.interview.portal.domain.PermissionTemplate;
import by.interview.portal.domain.Role;
import by.interview.portal.facade.PermissionFacade;

@WithMockUser(username = "user1", password = "user1")
@RunWith(SpringRunner.class)
@WebMvcTest(PermissionController.class)
public class PermissionControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private PermissionFacade permissionFacade;

    private PermissionTemplate permissionTemplate;

    @Before
    public void doSetup() {
        permissionTemplate = new PermissionTemplate();
        permissionTemplate.setDisciplineNameRequired(false);
        permissionTemplate.setId((long) 1);
        permissionTemplate.setName(new PermissionName((long) 1, "TEST_PERMISSION"));
        permissionTemplate.setOperation(new Operation((long) 1, "CREATE"));
        Set<Role> roles = new HashSet<>();
        roles.add(Role.COORDINATOR);
        roles.add(Role.DISCIPLINE_HEAD);
        permissionTemplate.setRoles(roles);
    }

    @Test
    public void shouldReturnPermissionById() throws Exception {
        given(permissionFacade.findById((long) 1)).willReturn(permissionTemplate);
        mvc.perform(get("/permission/1").contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name.name", is(permissionTemplate.getName().getName())))
                .andExpect(jsonPath("$.operation.name",
                        is(permissionTemplate.getOperation().getName())));
    }

    @Test
    public void shouldSavePermission() throws Exception {
        doNothing().when(permissionFacade).save(permissionTemplate);
        ObjectMapper objectMapper = new ObjectMapper();
        byte[] requestJson = objectMapper.writeValueAsBytes(permissionTemplate);
        mvc.perform(
                post("/permission").contentType(MediaType.APPLICATION_JSON).content(requestJson))
                .andExpect(status().isOk());
        verify(permissionFacade, times(1)).save(permissionTemplate);
    }
}
