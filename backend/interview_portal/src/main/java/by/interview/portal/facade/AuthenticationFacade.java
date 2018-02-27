package by.interview.portal.facade;

import by.interview.portal.dto.AuthenticationDTO;
import by.interview.portal.dto.CredentialsDTO;

public interface AuthenticationFacade {


    CredentialsDTO getUserPermission(AuthenticationDTO request);

    CredentialsDTO refreshCredentials(String refreshToken);
}
