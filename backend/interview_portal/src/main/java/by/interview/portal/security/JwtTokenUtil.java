package by.interview.portal.security;

import java.io.Serializable;

public class JwtTokenUtil implements Serializable{
    public String getloginFomToken(String token){
        return getClaimFromToken(token, Claims );
    }

    private String getClaimFromToken() {
    }
}
