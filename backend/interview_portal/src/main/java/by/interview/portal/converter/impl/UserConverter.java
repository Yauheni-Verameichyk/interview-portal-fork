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
		user.setRdps(customRDPRepository.findRoleDisciplinePermissions(userDTO.getRoleDisciplines()));
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
		setRolesDisciplinesPermissionsToDTO(entity.getRdps(), userDTO);
		return userDTO;
	}

	private void setRolesDisciplinesPermissionsToDTO(List<RoleDisciplinePermission> rdpList, UserDTO userDTO) {
		Set<String> permissionsSet = new HashSet<>();
		Map<Role, List<Discipline>> roleDisciplines = new HashMap<>();
		for (RoleDisciplinePermission roleDisciplinePermission : rdpList) {
			addPermissionToSet(permissionsSet, roleDisciplinePermission);
			addRoleDisciplinesToMap(roleDisciplines, roleDisciplinePermission);
		}
		userDTO.setPermissions(permissionsSet);
		userDTO.setRoleDisciplines(roleDisciplines);
	}

	private void addPermissionToSet(Set<String> permissionsSet, RoleDisciplinePermission roleDisciplinePermission) {
		permissionsSet.add(roleDisciplinePermission.getPermission().getName());
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
