package by.interview.portal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import by.interview.portal.dto.DisciplineDTO;
import by.interview.portal.dto.DisciplineWithHeadsDTO;
import by.interview.portal.facade.DisciplineFacade;
import by.interview.portal.utils.UserUtils;

@CrossOrigin
@RestController
@RequestMapping(value = "/discipline")
public class DisciplineController {

	@Autowired
	private DisciplineFacade disciplineFacade;

	@ResponseStatus(value = HttpStatus.OK)
	@GetMapping(value = "/{id}")
	public DisciplineWithHeadsDTO findById(@PathVariable Long id) {
		return disciplineFacade.findById(id);
	}

	@ResponseStatus(value = HttpStatus.OK)
	@GetMapping
	public List<DisciplineDTO> findAll(
			@RequestParam(name = "quantity", defaultValue = "0") Integer quantity) {
		return disciplineFacade.findByParentId(null, quantity);
	}

	@ResponseStatus(value = HttpStatus.OK)
	@GetMapping(value = "/parents/{id}")
	public List<DisciplineDTO> findSubItems(@PathVariable Long id) {
		return disciplineFacade.findByParentId(id);
	}

	@ResponseStatus(value = HttpStatus.OK)
	@PostMapping
	public void save(@RequestBody DisciplineWithHeadsDTO disciplineDTO) {
		disciplineFacade.save(disciplineDTO);
	}

	@ResponseStatus(value = HttpStatus.OK)
	@GetMapping(value = "/user")
	public List<DisciplineDTO> findDisciplinesForUser() {
		return disciplineFacade.findDisciplinesByUser(UserUtils.getCurrentUsersUsername());
	}

	@ResponseStatus(value = HttpStatus.OK)
	@DeleteMapping(value = "/{id}")
	public void deleteDiscipline(@PathVariable Long id) {
		disciplineFacade.deleteDiscipline(id);
	}
}
