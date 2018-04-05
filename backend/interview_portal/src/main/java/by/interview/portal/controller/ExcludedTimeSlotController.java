package by.interview.portal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import by.interview.portal.domain.ExcludedTimeSlot;
import by.interview.portal.facade.ExcludedTimeSlotFacade;

@CrossOrigin
@RestController
@RequestMapping(value = "/excluded-time")
public class ExcludedTimeSlotController {

    @Autowired
    private ExcludedTimeSlotFacade excludedTimeSlotFacade;

    @ResponseStatus(value = HttpStatus.OK)
    @PostMapping
    public void save(@RequestBody ExcludedTimeSlot excludedTimeSlot) {
        excludedTimeSlotFacade.save(excludedTimeSlot);
    }
}
