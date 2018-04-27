package by.interview.portal.utils.search;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

public class SpecificationBuilder<T> {
    private final List<SearchCriteria> params;

    public SpecificationBuilder() {
        params = new ArrayList<SearchCriteria>();
    }

    public SpecificationBuilder<T> with(String logicalOperand, String key, String operation, Object value) {
        params.add(new SearchCriteria(logicalOperand, key, operation, value));
        return this;
    }

    public Specification<T> build() {
        if (params.size() == 0) {
            return null;
        }

        List<Specification<T>> specs = new ArrayList<Specification<T>>();
        for (SearchCriteria param : params) {
            specs.add(new SpecificationImpl<T>(param));
        }

        Specification<T> result = specs.get(0);
        for (int i = 1; i < specs.size(); i++) {
            SpecificationImpl<T> as = (SpecificationImpl<T>) specs.get(i);
            if(as.getCriteria().getLogicalOperand()
                != null && as.getCriteria().getLogicalOperand().equals("OR##")){
                result = Specification.where(result).or(specs.get(i));
            }else{
                result = Specification.where(result).and(specs.get(i));
            }
        }
        return result;
    }
}
