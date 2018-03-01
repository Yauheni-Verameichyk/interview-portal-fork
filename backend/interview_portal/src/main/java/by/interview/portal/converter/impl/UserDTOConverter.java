package by.interview.portal.converter.impl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.PermissionTemplate;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.User;
import by.interview.portal.domain.UserRoleDiscipline;
import by.interview.portal.dto.UserDTO;
import by.interview.portal.repository.PermissionRepository;

@Component("userDTOConverter")
public class UserDTOConverter implements Converter<User, UserDTO> {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public User convertToEntity(UserDTO userDTO) {
        User user = modelMapper.map(userDTO, User.class);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setUserRoleDisciplines(getUserRoleDisciplines(userDTO.getRoleDisciplines(), user));
        return user;
    }

    @Override
    public UserDTO convertToDTO(User entity) {
        UserDTO userDTO = modelMapper.map(entity, UserDTO.class);
        userDTO.setRoleDisciplines(getRolesDisciplinesMap(entity.getUserRoleDisciplines()));
        userDTO.setPermissions(getPermissionsSet(
                permissionRepository.findAllByRolesIn(userDTO.getRoleDisciplines().keySet()),
                userDTO.getRoleDisciplines()));
        return userDTO;
    }

    private List<UserRoleDiscipline> getUserRoleDisciplines(
            Map<Role, List<Discipline>> roleDisciplinesMap, User user) {
        List<UserRoleDiscipline> userRoleDisciplines = new LinkedList<>();
        for (Map.Entry<Role, List<Discipline>> roleDiscipline : roleDisciplinesMap.entrySet()) {
            Role role = roleDiscipline.getKey();
            if (roleDiscipline.getValue() == null) {
                userRoleDisciplines.add(new UserRoleDiscipline(null, role, null, user));
            } else {
                for (Discipline discipline : roleDiscipline.getValue()) {
                    userRoleDisciplines.add(new UserRoleDiscipline(null, role, discipline, user));
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

    private Set<String> getPermissionsSet(List<PermissionTemplate> permissionsTemplatesListList,
            Map<Role, List<Discipline>> roleDisciplinesMap) {
        Set<String> permissionsSet = new HashSet<>();
        for (PermissionTemplate permissionTemplate : permissionsTemplatesListList) {
            generatePermissionsByTemplate(permissionTemplate, roleDisciplinesMap, permissionsSet);
        }
        return permissionsSet;
    }

    private void generatePermissionsByTemplate(PermissionTemplate permissionTemplate,
            Map<Role, List<Discipline>> roleDisciplinesMap, Set<String> permissionsSet) {
        for (Map.Entry<Role, List<Discipline>> roleDisciplines : roleDisciplinesMap.entrySet()) {
            generatePermissionsByRoleAndDisciplines(permissionTemplate, roleDisciplines,
                    permissionsSet);
        }
    }

    private void generatePermissionsByRoleAndDisciplines(PermissionTemplate permissionTemplate,
            Map.Entry<Role, List<Discipline>> roleDisciplines, Set<String> permissionsSet) {
        Role role = roleDisciplines.getKey();
        if (permissionTemplate.getRoles().contains(role)) {
            if (roleDisciplines.getValue() == null || roleDisciplines.getValue().isEmpty()
                    || !permissionTemplate.isDisciplineNameRequired()) {
                permissionsSet.add(generatePermission(permissionTemplate));
            } else {
                for (Discipline discipline : roleDisciplines.getValue()) {
                    permissionsSet.add(generatePermission(permissionTemplate, discipline));
                }
            }
        }
    }

    private String generatePermission(PermissionTemplate permissionTemplate) {
        return permissionTemplate.getName().getName() + "_"
                + permissionTemplate.getOperation().getName();
    }

    private String generatePermission(PermissionTemplate permissionTemplate,
            Discipline discipline) {
        return permissionTemplate.getName().getName() + "_"
                + permissionTemplate.getOperation().getName() + "_"
                + discipline.getName().toUpperCase().trim().replace(" ", "_");
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
}
