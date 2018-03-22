package by.interview.portal.controller;

import java.time.LocalDateTime;
import java.time.Period;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.SpecifiedTime;
import by.interview.portal.domain.User;
import by.interview.portal.domain.UserRoleDiscipline;
import by.interview.portal.dto.DisciplineDTO;
import by.interview.portal.dto.DisciplineWithHeadsDTO;
import by.interview.portal.facade.DisciplineFacade;
import by.interview.portal.repository.SpecifiedTimeRepository;

@CrossOrigin
@RestController
@RequestMapping(value = "/discipline")
public class DisciplineController {

    @Autowired
    private DisciplineFacade disciplineFacade;

    @Autowired
    private SpecifiedTimeRepository specifiedTimeRepository;

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/{id}")
    public DisciplineWithHeadsDTO findById(@PathVariable Long id) {
        return disciplineFacade.findById(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping
    public List<DisciplineDTO> findAll() {
        SpecifiedTime st = new SpecifiedTime();

        Discipline discipline = new Discipline(1, "Name", "Description", null);
        User user = new User();
        user.setId(1L);
        user.setName("Vasia");
        user.setLogin("sgfg");
        user.setPhoneNumber("dfgsg");
        user.setSurname("Pupkin");
        UserRoleDiscipline userRoleDiscipline =
                new UserRoleDiscipline(1L, Role.DISCIPLINE_HEAD, discipline, null);
        user.setUserRoleDisciplines(Arrays.asList(userRoleDiscipline));

        st.setStartTime(LocalDateTime.of(2018, 3, 22, 18, 00));
        st.setEndTime(LocalDateTime.of(2019, 3, 22, 18, 00));
        st.setRepeatInterval(Period.ofDays(7));
        st.setUser(user);
        // specifiedTimeRepository.save(st);
        SpecifiedTime st2 = new SpecifiedTime();
        st2.setStartTime(LocalDateTime.of(2018, 3, 21, 18, 00));
        st2.setEndTime(LocalDateTime.of(2018, 9, 22, 18, 00));
        st2.setRepeatInterval(Period.ofDays(7));
        st2.setUser(user);
        // specifiedTimeRepository.save(st2);
        // st = specifiedTimeRepository.findById(222L).get();
        System.err.println(st2);
        for (SpecifiedTime s : specifiedTimeRepository.findAllInRange(
                LocalDateTime.of(2017, 3, 22, 18, 00), LocalDateTime.of(2019, 3, 30, 18, 00), 1L)) {
            System.err.println(s);
        }
        System.err.println("Dividing");
        for (SpecifiedTime s : specifiedTimeRepository.findAll()) {
            System.err.println(s);
        }
        // System.err.println(specifiedTimeRepository.findAllInRange(
        // LocalDateTime.of(2017, 3, 22, 18, 00), LocalDateTime.of(2019, 3, 30, 18, 00), 1L));
        // System.err.println(specifiedTimeRepository.findAll());
        return disciplineFacade.findByParentId(null);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/parents/{id}")
    public List<DisciplineDTO> findSubItems(@PathVariable Long id) {
        return disciplineFacade.findByParentId(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping
    public void save(@RequestBody DisciplineWithHeadsDTO disciplineDTO) {
        disciplineFacade.save(disciplineDTO);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/user")
    public List<DisciplineDTO> findDisciplinesForUser() {
        return disciplineFacade.findDisciplinesByUser(getCurrentUsersUsername());
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping(value = "/{id}")
    public void deleteDiscipline(@PathVariable Long id) {
        disciplineFacade.deleteDiscipline(id);
    }

    public String getCurrentUsersUsername() {
        return ((UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal())
                .getUsername();
    }
}
