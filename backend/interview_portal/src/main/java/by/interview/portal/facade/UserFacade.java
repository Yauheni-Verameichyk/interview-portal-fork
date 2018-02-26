package by.interview.portal.facade;

import java.util.List;
import java.util.Optional;

import by.interview.portal.domain.Role;
import by.interview.portal.dto.UserDTO;

public interface UserFacade {

	List<UserDTO> findAll();

	void save(UserDTO user);

	Optional<UserDTO> findById(long userId);

	List<UserDTO> findAllByRole(Role role);
}
