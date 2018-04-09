package by.interview.portal.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import by.interview.portal.dto.SpecifiedTimeDTO;
import by.interview.portal.facade.SpecifiedTimeFacade;

@CrossOrigin
@RestController
@RequestMapping(value = "/slots")
public class SpecifiedTimeController {
    @Autowired
    private SpecifiedTimeFacade specifiedTimeFacade;

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/discipline/{rangeStart}/{rangeEnd}/{disciplineId}")
    public List<SpecifiedTimeDTO> findAllInRange(
            @PathVariable @DateTimeFormat(
                    pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime rangeStart,
            @PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime rangeEnd,
            @PathVariable Long disciplineId) {
        return specifiedTimeFacade.findAllInRange(rangeStart, rangeEnd, disciplineId);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/user/{rangeStart}/{rangeEnd}")
    public List<SpecifiedTimeDTO> findAllForUserInRange(
            @PathVariable @DateTimeFormat(
                    pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime rangeStart,
            @PathVariable @DateTimeFormat(
                    pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime rangeEnd) {
        return specifiedTimeFacade.findAllForUserInRange(rangeStart, rangeEnd);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping
    public void save(@RequestBody SpecifiedTimeDTO specifiedTimeDTO) {
        specifiedTimeFacade.save(specifiedTimeDTO);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping(value = "/{id}")
    public SpecifiedTimeDTO findById(@PathVariable Long id) {
        return specifiedTimeFacade.findById(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping(value = "/{id}")
    public void delete(@PathVariable Long id) {
        specifiedTimeFacade.deleteById(id);
    }

    @ResponseStatus(value = HttpStatus.OK)
    @DeleteMapping(value = "/group/{id}")
    public void deleteByGroupId(@PathVariable Long id) {
        specifiedTimeFacade.deleteByGroupId(id);
    }
}
