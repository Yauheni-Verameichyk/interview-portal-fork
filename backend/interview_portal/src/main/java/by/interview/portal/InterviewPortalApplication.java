package by.interview.portal;

import by.interview.portal.controller.AuthenticationController;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InterviewPortalApplication {



    public static void main(String[] args) {
        SpringApplication.run(InterviewPortalApplication.class, args);
    }

}
