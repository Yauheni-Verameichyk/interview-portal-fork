package by.interview.portal.service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.RoleDisciplinePermission;
import by.interview.portal.domain.User;
import by.interview.portal.dto.UserDTO;
import by.interview.portal.repository.CustomRoleDisciplinePermissionRepository;
import by.interview.portal.repository.UserRepository;

@Service
@Transactional
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CustomRoleDisciplinePermissionRepository customRDPRepository;

	public UserDTO findById(Long id) {
		Optional<User> user = userRepository.findById(id);
		return user.isPresent() ? convertUserToDTO(user.get()) : null;
	}

	public List<UserDTO> findAll() {
		return convertUsersListToDTOList(userRepository.findAll());
	}

	public void save(UserDTO userDTO) {
		userRepository.save(convertDTOToUser(userDTO));
	}

	private User convertDTOToUser(UserDTO userDTO) {
		User user = new User();
		user.setId(userDTO.getId());
		user.setEmail(userDTO.getEmail());
		user.setName(userDTO.getName());
		user.setPassword(userDTO.getPassword());
		user.setPhoneNumber(userDTO.getPhoneNumber());
		user.setSurname(userDTO.getSurname());
		user.setRdps(customRDPRepository.findRoleDisciplinePermissions(userDTO.getRoleDisciplines()));
		return user;
	}

	private UserDTO convertUserToDTO(User user) {
		UserDTO userDTO = new UserDTO();
		userDTO.setId(user.getId());
		userDTO.setEmail(user.getEmail());
		userDTO.setName(user.getName());
		userDTO.setPassword(user.getPassword());
		userDTO.setPhoneNumber(user.getPhoneNumber());
		userDTO.setSurname(user.getSurname());
		setRolesDisciplinesPermissionsToDTO(user.getRdps(), userDTO);
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

	private List<UserDTO> convertUsersListToDTOList(List<User> usersList) {
		return usersList.stream().map(user -> convertUserToDTO(user)).collect(Collectors.toList());
	}
}
