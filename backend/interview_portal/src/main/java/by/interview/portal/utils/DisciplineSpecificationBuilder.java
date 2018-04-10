package by.interview.portal.utils;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import by.interview.portal.domain.Discipline;

public class DisciplineSpecificationBuilder {
    private final List<SearchCriteria> params;

    public DisciplineSpecificationBuilder() {
        params = new ArrayList<SearchCriteria>();
    }

    public DisciplineSpecificationBuilder with(String key, String operation, Object value) {
        params.add(new SearchCriteria(key, operation, value));
        return this;
    }

    public Specification<Discipline> build() {
        if (params.size() == 0) {
            return null;
        }

        List<Specification<Discipline>> specs = new ArrayList<Specification<Discipline>>();
        for (SearchCriteria param : params) {
            specs.add(new DisciplineSpecification(param));
        }

        Specification<Discipline> result = specs.get(0);
        for (int i = 1; i < specs.size(); i++) {
            result = Specification.where(result).and(specs.get(i));
        }
        return result;
    }
}
