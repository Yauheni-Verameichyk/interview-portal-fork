package by.interview.portal.config;

import by.interview.portal.converter.impl.CandidateDTOConverter;
import by.interview.portal.domain.Candidate;
import by.interview.portal.dto.CandidateDTO;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import by.interview.portal.converter.Converter;
import by.interview.portal.converter.impl.DisciplineDTOConverter;
import by.interview.portal.converter.impl.DisciplineWithHeadsConverter;
import by.interview.portal.domain.Discipline;
import by.interview.portal.dto.DisciplineDTO;
import by.interview.portal.dto.DisciplineWithHeadsDTO;

@TestConfiguration
public class TestConverterConfig {

    @Bean
    @Qualifier("disciplineDTOConverter")
    public Converter<Discipline, DisciplineDTO> disciplineDTOConverter() {
        return new DisciplineDTOConverter();
    }

    @Bean
    @Qualifier("disciplineWithHeadsConverter")
    public Converter<Discipline, DisciplineWithHeadsDTO> disciplineWithHeadsConverter() {
        return new DisciplineWithHeadsConverter();
    }

    @Bean
    @Qualifier("candidateDTOConverter")
    public Converter<Candidate, CandidateDTO> candidateDTOConverter() {
        return new CandidateDTOConverter();
    }

}

