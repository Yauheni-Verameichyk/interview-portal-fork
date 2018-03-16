package by.interview.portal.repository;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;

import java.util.Arrays;
import java.util.HashSet;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import by.interview.portal.config.TestRepositoryConfig;
import by.interview.portal.domain.Discipline;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = {TestRepositoryConfig.class})
@Transactional
public class DisciplineRepositoryTest {

    @Autowired
    private DisciplineRepository disciplineRepository;

    private Discipline discipline;
    private Discipline subItem;

    @Before
    public void doSetup() {
        discipline = new Discipline(1L, "Java", "Best of the best language!!!", null);
        subItem = new Discipline(13L, "Java core", "sdfsdffsdfs", 1L);
    }

    @Test
    public void shouldFindDisciplinesByParentName() {
        assertThat(disciplineRepository.findAllByParentId(1L), equalTo(Arrays.asList(subItem)));
    }

    @Test
    public void shouldFindDisciplineByName() {
        assertThat(disciplineRepository.findByName("Java"), equalTo(discipline));
    }

    @Test
    public void shouldFindDisciplinesByUsername() {
        assertThat(disciplineRepository.findDisciplinesByUser("gortiz0@mapy.cz"),
                equalTo(new HashSet<>(Arrays.asList(discipline))));
    }
}
