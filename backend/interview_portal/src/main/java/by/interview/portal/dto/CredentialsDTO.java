package by.interview.portal.dto;

import java.util.Set;

import lombok.Data;

@Data
public class CredentialsDTO {
    private String accessToken;
    private String refreshToken;
    private Set<String> permissions;
}

