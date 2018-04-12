package by.interview.portal.utils.search;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import by.interview.portal.utils.SearchCriteria;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecificationImpl<T> implements Specification<T> {

    private static final long serialVersionUID = 3416208150948783433L;
    private SearchCriteria criteria;

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
        if (criteria.getOperation().equalsIgnoreCase("=")) {
            return getEqualPredicate(root, query, builder);
        } else if (criteria.getOperation().equalsIgnoreCase("<>")) {
            return getNotEqualPredicate(root, query, builder);
        } else if (criteria.getOperation().equalsIgnoreCase(":")) {
            return builder.like(builder.upper(root.<String>get(criteria.getKey())),
                    ("%" + criteria.getValue() + "%").toUpperCase());
        }
        return null;
    }

    private Predicate getEqualPredicate(Root<T> root, CriteriaQuery<?> query,
            CriteriaBuilder builder) {
        if (criteria.getValue() == null || criteria.getValue() instanceof String
                || ((String) criteria.getValue()).equals("null")) {
            return builder.isNull(root.<String>get(criteria.getKey()));
        } else {
            return builder.equal(root.<String>get(criteria.getKey()), criteria.getValue());
        }
    }

    private Predicate getNotEqualPredicate(Root<T> root, CriteriaQuery<?> query,
            CriteriaBuilder builder) {
        if (criteria.getValue() == null || criteria.getValue() instanceof String
                || ((String) criteria.getValue()).equals("null")) {
            return builder.isNotNull(root.<String>get(criteria.getKey()));
        } else {
            return builder.notEqual(root.<String>get(criteria.getKey()), criteria.getValue());
        }
    }
}
