package by.interview.portal.dto;

import lombok.Data;




import java.util.Set;

@Data
public class CredentialsDTO {
    private String accessToken;
    private String refreshToken;
    private Set<String> permissions;

}

