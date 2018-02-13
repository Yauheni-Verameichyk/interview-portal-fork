package by.interview.portal.facade.impl;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import by.interview.portal.converter.Converter;
import by.interview.portal.domain.User;
import by.interview.portal.dto.UserDTO;
import by.interview.portal.facade.UserFacade;
import by.interview.portal.service.UserService;

@Service
public class UserFacadeImpl implements UserFacade {

	@Autowired
	private UserService userService;

	@Autowired
	@Qualifier("userConverter")
	private Converter<User, UserDTO> userConverter;

	@Override
	public List<UserDTO> findAll() {
		return userService.findAll().stream().filter(Objects::nonNull).map(userConverter::convertToDTO)
				.collect(Collectors.toList());
	}

	@Override
	public void save(UserDTO userDTO) {
		User user = userConverter.convertToEntity(userDTO);
		userService.save(user);
	}

	@Override
	public Optional<UserDTO> findById(long userId) {
		return userService.findById(userId).map(userConverter::convertToDTO);
	}
}
