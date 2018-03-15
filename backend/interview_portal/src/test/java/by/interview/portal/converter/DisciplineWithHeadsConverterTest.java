package by.interview.portal.converter;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;

import java.util.Arrays;
import java.util.HashSet;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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
import by.interview.portal.domain.Role;
import by.interview.portal.dto.DisciplineWithHeadsDTO;
import by.interview.portal.dto.UserBaseInfoDTO;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = {SpringConfig.class, TestConverterConfig.class})
public class DisciplineWithHeadsConverterTest {

    @Autowired
    @Qualifier("disciplineWithHeadsConverter")
    private Converter<Discipline, DisciplineWithHeadsDTO> disciplineDTOConverter;

    private DisciplineWithHeadsDTO disciplineDTO;

    private Discipline discipline;

    private DisciplineWithHeadsDTO convertedDisciplineDTO;

    @Before
    public void doSetup() {
        UserBaseInfoDTO userBaseInfoDTO = new UserBaseInfoDTO((long) 1, "Vasia", "Pupkin",
                Stream.of(Role.DISCIPLINE_HEAD).collect(Collectors.toSet()));
        disciplineDTO = new DisciplineWithHeadsDTO(1L, "Name", "Description", null, null,
                new HashSet<UserBaseInfoDTO>(Arrays.asList(userBaseInfoDTO)));
        discipline = new Discipline(1, "Name", "Description", null);
        convertedDisciplineDTO = new DisciplineWithHeadsDTO();
        convertedDisciplineDTO.setId(1L);
        convertedDisciplineDTO.setName("Name");
        convertedDisciplineDTO.setSubscription("Description");
    }

    @Test
    public void shouldConvertDisciplineToDisciplineWithHeadsDTO() {
        assertThat(disciplineDTOConverter.convertToDTO(discipline),
                equalTo(convertedDisciplineDTO));
    }

    @Test
    public void shouldConvertDisciplineWithHeadsDTOToDiscipline() {
        assertThat(disciplineDTOConverter.convertToEntity(disciplineDTO), equalTo(discipline));
    }
}
