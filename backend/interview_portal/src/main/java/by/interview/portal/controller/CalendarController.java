package by.interview.portal.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import by.interview.portal.dto.CalendarDTO;
import by.interview.portal.facade.CalendarFacade;

@CrossOrigin
@RestController
@RequestMapping(value = "/calendar")
public class CalendarController {

    @Autowired
    private CalendarFacade calendarFacade;

    @ResponseStatus(value = HttpStatus.OK)
    @GetMapping("/user/{rangeStart}/{rangeEnd}")
    public CalendarDTO findAllForUserInRange(
            @PathVariable @DateTimeFormat(
                    pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime rangeStart,
            @PathVariable @DateTimeFormat(
                    pattern = "yyyy-MM-dd'T'HH:mm:ss") LocalDateTime rangeEnd) {
        return calendarFacade.findAllForUserInRange(rangeStart, rangeEnd);
    }
}
