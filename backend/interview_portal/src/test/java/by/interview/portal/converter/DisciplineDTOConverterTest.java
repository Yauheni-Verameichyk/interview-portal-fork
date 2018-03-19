package by.interview.portal.converter;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import by.interview.portal.config.SpringConfig;
import by.interview.portal.config.TestConverterConfig;
import by.interview.portal.domain.Discipline;
import by.interview.portal.dto.DisciplineDTO;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {SpringConfig.class, TestConverterConfig.class})
public class DisciplineDTOConverterTest {

    @Autowired
    @Qualifier("disciplineDTOConverter")
    private Converter<Discipline, DisciplineDTO> disciplineDTOConverter;

    private DisciplineDTO disciplineDTO;

    private Discipline discipline;

    @Before
    public void doSetup() {
        disciplineDTO = new DisciplineDTO((long) 1, "Name", "Description", null, false);
        discipline = new Discipline(1, "Name", "Description", null);
    }

    @Test
    public void shouldConvertDisciplineToDisciplineDTO() {
        assertThat(disciplineDTOConverter.convertToDTO(discipline), equalTo(disciplineDTO));
    }

    @Test
    public void shouldConvertDisciplineDTOToDiscipline() {
        assertThat(disciplineDTOConverter.convertToEntity(disciplineDTO), equalTo(discipline));
    }
}
