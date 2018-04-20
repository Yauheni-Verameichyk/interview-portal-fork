package by.interview.portal.utils.search;

import by.interview.portal.domain.Role;
import by.interview.portal.domain.User;
import by.interview.portal.domain.UserRoleDiscipline;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

import org.springframework.data.jpa.domain.Specification;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

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
        } else if (criteria.getOperation().equalsIgnoreCase("#")){
            query.distinct(true);
            Expression<Collection<T>> users = root.join("userRoleDisciplines").get("role");
            List<Role> roles = Arrays.stream(((String)criteria.getValue()).split(",")).map(Role::valueOf).collect(
                Collectors.toList());
            return users.in(roles);
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
