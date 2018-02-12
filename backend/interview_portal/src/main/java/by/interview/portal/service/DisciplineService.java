package by.interview.portal.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Permission;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.RoleDisciplinePermission;
import by.interview.portal.repository.DisciplineRepository;
import by.interview.portal.repository.PermissionRepository;
import by.interview.portal.repository.RoleDisciplinePermissionRepository;

@Service
@Transactional
public class DisciplineService {

	@Autowired
	private DisciplineRepository disciplineRepository;

	@Autowired
	private PermissionRepository permissionRepository;

	@Autowired
	private RoleDisciplinePermissionRepository roleDisciplinePermissionRepository;

	public Discipline findById(Long id) {
		Optional<Discipline> discipline = disciplineRepository.findById(id);
		return discipline.isPresent() ? discipline.get() : null;

	}

	// public List<Discipline> findAll() {
	// return disciplineRepository.findAll();
	// }

	public List<Discipline> findByParentId(Long id) {
		return disciplineRepository.findAllByParentId(id);
	}

	// add exception cast in the future if discipline with this name already exists
	public void save(Discipline discipline) {
		if (disciplineRepository.findByName(discipline.getName()) == null) {
			discipline = disciplineRepository.save(discipline);
			roleDisciplinePermissionRepository.saveAll(generateRoleDisciplinePermissionList(discipline));
		}
	}

	private List<RoleDisciplinePermission> generateRoleDisciplinePermissionList(Discipline discipline) {
		String permissionNamePart = discipline.getName().trim().replaceAll(" ", "_").toUpperCase();
		List<RoleDisciplinePermission> roleDisciplinePermissionList = new LinkedList<>();
		roleDisciplinePermissionList.add(createRoleDisciplinePermission(Role.COORDINATOR, null,
				createPermission("EDIT_DISCIPLINE_" + permissionNamePart)));
		roleDisciplinePermissionList.add(createRoleDisciplinePermission(Role.COORDINATOR, null,
				createPermission("DELETE_DISCIPLINE_" + permissionNamePart)));
		roleDisciplinePermissionList.add(createRoleDisciplinePermission(Role.DISCIPLINE_HEAD, discipline,
				createPermission("ADD_SUB_ITEM_DISCIPLINE_" + permissionNamePart)));
		roleDisciplinePermissionList.add(createRoleDisciplinePermission(Role.DISCIPLINE_HEAD, discipline,
				createPermission("EDIT_SUB_ITEM_DISCIPLINE_" + permissionNamePart)));
		roleDisciplinePermissionList.add(createRoleDisciplinePermission(Role.DISCIPLINE_HEAD, discipline,
				createPermission("DELETE_SUB_ITEM_DISCIPLINE_" + permissionNamePart)));
		roleDisciplinePermissionList.add(createRoleDisciplinePermission(Role.DISCIPLINE_HEAD, discipline,
				createPermission("ADD_INTERVIEWER_DISCIPLINE_" + permissionNamePart)));
		roleDisciplinePermissionList.add(createRoleDisciplinePermission(Role.DISCIPLINE_HEAD, discipline,
				createPermission("EDIT_INTERVIEWER_DISCIPLINE_" + permissionNamePart)));
		roleDisciplinePermissionList.add(createRoleDisciplinePermission(Role.DISCIPLINE_HEAD, discipline,
				createPermission("DELETE_INTERVIEWER_DISCIPLINE_" + permissionNamePart)));
		roleDisciplinePermissionList.add(createRoleDisciplinePermission(Role.COORDINATOR, null,
				createPermission("ADD_INTERVIEWER_DISCIPLINE_" + permissionNamePart)));
		roleDisciplinePermissionList.add(createRoleDisciplinePermission(Role.COORDINATOR, null,
				createPermission("EDIT_INTERVIEWER_DISCIPLINE_" + permissionNamePart)));
		roleDisciplinePermissionList.add(createRoleDisciplinePermission(Role.COORDINATOR, null,
				createPermission("DELETE_INTERVIEWER_DISCIPLINE_" + permissionNamePart)));
		return roleDisciplinePermissionList;
	}

	private RoleDisciplinePermission createRoleDisciplinePermission(Role role, Discipline discipline,
			Permission permission) {
		RoleDisciplinePermission roleDisciplinePermission = new RoleDisciplinePermission(null, role, discipline,
				permission);
		return roleDisciplinePermission;
	}

	private Permission createPermission(String permissionName) {
		Permission permission = permissionRepository.findByName(permissionName);
		if (permission == null) {
			permission = new Permission(null, permissionName);
			permissionRepository.save(permission);
		}
		return permission;
	}
}
