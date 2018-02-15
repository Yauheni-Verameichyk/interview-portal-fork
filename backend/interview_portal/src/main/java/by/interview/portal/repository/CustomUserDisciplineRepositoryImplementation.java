package by.interview.portal.repository;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.UserRoleDiscipline;

@Repository
public class CustomUserDisciplineRepositoryImplementation
        implements CustomUserRoleDisciplineRepository {

    @Autowired
    private EntityManager entityManager;

    @Override
    public List<UserRoleDiscipline> findUserRoleDisciplines(
            Map<Role, List<Discipline>> roleDisciplinesMap) {
        Integer iterationsCount = 0;
        if (roleDisciplinesMap == null) {
            return Collections.emptyList();
        }
        Query query = entityManager.createNativeQuery(
                generateSQLQueryString(roleDisciplinesMap, iterationsCount),
                UserRoleDiscipline.class);
        setQueryParameters(roleDisciplinesMap, iterationsCount, query);
        @SuppressWarnings("unchecked")
        List<UserRoleDiscipline> results = query.getResultList();
        return results;
    }

    private String generateSQLQueryString(Map<Role, List<Discipline>> roleDisciplinesMap,
            Integer iterationsCount) {
        String sql = "SELECT * FROM users_disciplines_permissions urds WHERE ";
        for (Map.Entry<Role, List<Discipline>> entry : roleDisciplinesMap.entrySet()) {
            Role role = entry.getKey();
            List<Discipline> lDisciplines = entry.getValue();
            if (lDisciplines == null || lDisciplines.isEmpty()) {
                String op = iterationsCount == 0 ? "" : " OR ";
                sql += op + "((urds.role_id = :" + role + ")";
                sql += " AND " + "(urds.discipline_id is null)) ";
                iterationsCount++;
            } else {
                for (int i = 0; i < lDisciplines.size(); i++) {
                    String op = iterationsCount == 0 ? "" : " OR ";
                    sql += op + "(urds.role_id = :" + role;
                    sql += " AND " + "urds.discipline_id = :"
                            + lDisciplines.get(i).getName().replaceAll("\\s+", "") + ")";
                    iterationsCount++;
                }
            }
        }
        return sql;
    }

    private void setQueryParameters(Map<Role, List<Discipline>> roleDisciplinesMap,
            Integer iterationsCount, Query query) {
        for (Map.Entry<Role, List<Discipline>> entry : roleDisciplinesMap.entrySet()) {
            Role role = entry.getKey();
            List<Discipline> lDisciplines = entry.getValue();
            if (lDisciplines != null) {
                for (int i = 0; i < lDisciplines.size(); i++) {
                    query.setParameter(String.valueOf(role), role.ordinal());
                    query.setParameter(lDisciplines.get(i).getName().replaceAll("\\s+", ""),
                            lDisciplines.get(i).getId());
                }
            } else {
                query.setParameter(String.valueOf(role), role.ordinal());
            }
        }
    }
}
