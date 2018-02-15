package by.interview.portal.converter.impl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.RoleDisciplinePermission;
import by.interview.portal.domain.User;
import by.interview.portal.domain.UserRoleDiscipline;
import by.interview.portal.dto.UserDTO;
import by.interview.portal.repository.CustomRoleDisciplinePermissionRepository;

@Component("userConverter")
public class UserConverter implements Converter<User, UserDTO> {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private CustomRoleDisciplinePermissionRepository customRDPRepository;

    @Override
    public User convertToEntity(UserDTO userDTO) {
        User user = new User();
        user.setId(userDTO.getId());
        user.setLogin(userDTO.getLogin());
        user.setName(userDTO.getName());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setPhoneNumber(userDTO.getPhoneNumber());
        user.setSurname(userDTO.getSurname());
        user.setUserRoleDisciplines(getUserRoleDisciplines(userDTO.getRoleDisciplines(), user));
        return user;
    }

    @Override
    public UserDTO convertToDTO(User entity) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(entity.getId());
        userDTO.setLogin(entity.getLogin());
        userDTO.setName(entity.getName());
        userDTO.setPassword(entity.getPassword());
        userDTO.setPhoneNumber(entity.getPhoneNumber());
        userDTO.setSurname(entity.getSurname());
        userDTO.setRoleDisciplines(getRolesDisciplinesMap(entity.getUserRoleDisciplines()));
        userDTO.setPermissions(getPermissionsSet(
                customRDPRepository.findRoleDisciplinePermissions(userDTO.getRoleDisciplines())));
        return userDTO;
    }

    private List<UserRoleDiscipline> getUserRoleDisciplines(
            Map<Role, List<Discipline>> roleDisciplinesMap, User user) {
        List<UserRoleDiscipline> userRoleDisciplines = new LinkedList<>();
        for (Map.Entry<Role, List<Discipline>> entry : roleDisciplinesMap.entrySet()) {
            Role role = entry.getKey();
            if (entry.getValue() == null) {
                UserRoleDiscipline userRoleDiscipline = new UserRoleDiscipline();
                userRoleDiscipline.setDiscipline(null);
                userRoleDiscipline.setRole(role);
                userRoleDiscipline.setUser(user);
                userRoleDisciplines.add(userRoleDiscipline);
            } else {
                for (Discipline discipline : entry.getValue()) {
                    UserRoleDiscipline userRoleDiscipline = new UserRoleDiscipline();
                    userRoleDiscipline.setDiscipline(discipline);
                    userRoleDiscipline.setRole(role);
                    userRoleDiscipline.setUser(user);
                    userRoleDisciplines.add(userRoleDiscipline);
                }
            }
        }
        return userRoleDisciplines;
    }

    private Map<Role, List<Discipline>> getRolesDisciplinesMap(
            List<UserRoleDiscipline> userRoleDisciplines) {
        Map<Role, List<Discipline>> roleDisciplines = new HashMap<>();
        for (UserRoleDiscipline userRoleDiscipline : userRoleDisciplines) {
            addRoleDisciplinesToMap(roleDisciplines, userRoleDiscipline);
        }
        return roleDisciplines;
    }


    private Set<String> getPermissionsSet(List<RoleDisciplinePermission> rdpList) {
        Set<String> permissionsSet = new HashSet<>();
        Map<Role, List<Discipline>> roleDisciplines = new HashMap<>();
        for (RoleDisciplinePermission roleDisciplinePermission : rdpList) {
            addPermissionToSet(permissionsSet, roleDisciplinePermission);
            addRoleDisciplinesToMap(roleDisciplines, roleDisciplinePermission);
        }
        return permissionsSet;
    }

    private void addPermissionToSet(Set<String> permissionsSet,
            RoleDisciplinePermission roleDisciplinePermission) {
        permissionsSet.add(roleDisciplinePermission.getPermission().getName());
    }

    private void addRoleDisciplinesToMap(Map<Role, List<Discipline>> roleDisciplines,
            UserRoleDiscipline userRoleDiscipline) {
        List<Discipline> disciplines = null;
        if (roleDisciplines.containsKey(userRoleDiscipline.getRole())) {
            disciplines = roleDisciplines.get(userRoleDiscipline.getRole());
            if (!disciplines.contains(userRoleDiscipline.getDiscipline())) {
                disciplines.add(userRoleDiscipline.getDiscipline());
            }
        } else {
            if (userRoleDiscipline.getDiscipline() != null) {
                disciplines = new LinkedList<>();
                disciplines.add(userRoleDiscipline.getDiscipline());
            }
            roleDisciplines.put(userRoleDiscipline.getRole(), disciplines);
        }
    }

    private void addRoleDisciplinesToMap(Map<Role, List<Discipline>> roleDisciplines,
            RoleDisciplinePermission roleDisciplinePermission) {
        List<Discipline> disciplines;
        if (roleDisciplines.containsKey(roleDisciplinePermission.getRole())) {
            disciplines = roleDisciplines.get(roleDisciplinePermission.getRole());
            if (!disciplines.contains(roleDisciplinePermission.getDiscipline())) {
                disciplines.add(roleDisciplinePermission.getDiscipline());
            }
        } else {
            disciplines = new LinkedList<>();
            disciplines.add(roleDisciplinePermission.getDiscipline());
            roleDisciplines.put(roleDisciplinePermission.getRole(), disciplines);
        }
    }
}
