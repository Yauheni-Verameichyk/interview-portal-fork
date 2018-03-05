package by.interview.portal.dto;

import lombok.Data;

@Data
public class AuthenticationDTO {
    private String login;
    private String password;

    public AuthenticationDTO() {}

    public AuthenticationDTO(String login, String password) {
        this.login = login;
        this.password = password;
    }

}
