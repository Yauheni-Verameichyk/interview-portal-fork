package by.interview.portal.service.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.Discipline;
import by.interview.portal.domain.Role;
import by.interview.portal.domain.User;
import by.interview.portal.domain.UserRoleDiscipline;
import by.interview.portal.dto.DisciplineDTO;
import by.interview.portal.dto.UserBaseInfoDTO;
import by.interview.portal.dto.UserDTO;
import by.interview.portal.repository.DisciplineRepository;
import by.interview.portal.repository.UserRepository;
import by.interview.portal.repository.UserRoleDisciplineRepository;
import by.interview.portal.service.DisciplineService;

@Service
@Transactional
public class DisciplineServiceImpl implements DisciplineService {

	@Autowired
	private DisciplineRepository disciplineRepository;

	@Autowired
	private UserRoleDisciplineRepository userRoleDisciplineRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	@Qualifier("userDTOConverter")
	private Converter<User, UserDTO> userDTOConverter;

	@Autowired
	@Qualifier("userBaseInfoDTOConverter")
	private Converter<User, UserBaseInfoDTO> userBaseInfoDTOConverter;

	@Autowired
	@Qualifier("disciplineConverter")
	private Converter<Discipline, DisciplineDTO> disciplineConverter;

	@Override
	public DisciplineDTO findById(Long id) {
		Optional<Discipline> discipline = disciplineRepository.findById(id);
		DisciplineDTO disciplineDTO = disciplineConverter.convertToDTO(discipline.get());
		if (disciplineDTO.getParentId() != null) {
			Discipline parentDiscipline = disciplineRepository.findById(disciplineDTO.getParentId()).get();
			disciplineDTO.setParentName(parentDiscipline.getName());
		} else {
			disciplineDTO.setDisciplineHeadsList(userRepository
					.findAllByRoleAndDiscipline(Role.DISCIPLINE_HEAD, discipline.get()).stream()
					.filter(Objects::nonNull).map(userBaseInfoDTOConverter::convertToDTO).collect(Collectors.toSet()));
		}
		return disciplineDTO;
	}

	@Override
	public List<Discipline> findByParentId(Long id) {
		return disciplineRepository.findAllByParentId(id);
	}

	// add exception cast in the future if discipline with this name already exists
	@Override
	public void save(DisciplineDTO disciplineDTO) {
		if (disciplineRepository.findByName(disciplineDTO.getName()) == null) {
			Discipline discipline = disciplineRepository.save(disciplineConverter.convertToEntity(disciplineDTO));
			for (User user : disciplineDTO.getDisciplineHeadsList().stream()
					.map(userBaseInfoDTOConverter::convertToEntity).collect(Collectors.toSet())) {
				userRoleDisciplineRepository.save(new UserRoleDiscipline(null, Role.DISCIPLINE_HEAD, discipline, user));
			}
		}
	}

	@Override
	public List<Discipline> findDisciplinesByUser(String login) {
		return disciplineRepository.findDisciplinesByUser(login);
	};
}
