package by.interview.portal.converter.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.PermissionTemplate;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.User;
import by.interview.portal.dto.JwtUserDTO;
import by.interview.portal.dto.UserDTO;
import by.interview.portal.repository.PermissionRepository;

@Component("jwtUserConverter")
public final class JwtUserConverter implements Converter<User, JwtUserDTO> {

    @Autowired
    @Qualifier("userDTOConverter")
    private Converter<User, UserDTO> converter;

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public User convertToEntity(JwtUserDTO jwtUser) {
        User user = modelMapper.map(jwtUser, User.class);
        return user;
    }

    @Override
    public JwtUserDTO convertToDTO(User user) {
        Set<String> permissions = getPermissionsSet(converter.convertToDTO(user));
        return new JwtUserDTO(user.getPassword(), user.getLogin(),
                mapToGrantedAuthorities(permissions), true);
    }

    private List<GrantedAuthority> mapToGrantedAuthorities(Set<String> permissions) {
        return permissions.stream().map(authority -> new SimpleGrantedAuthority(authority))
                .collect(Collectors.toList());
    }

    private Set<String> getPermissionsSet(UserDTO userDTO) {
        Set<String> permissionsSet = new HashSet<>();
        for (PermissionTemplate permissionTemplate : permissionRepository
                .findAllByRolesIn(userDTO.getRoleDisciplines().keySet())) {
            generatePermissionsByTemplate(permissionTemplate, userDTO.getRoleDisciplines(),
                    permissionsSet);
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
}
