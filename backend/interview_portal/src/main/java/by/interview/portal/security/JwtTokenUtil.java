package by.interview.portal.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import by.interview.portal.constant.JwtConstant;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil {
	private static final Logger LOG = LogManager.getLogger(JwtTokenUtil.class);

	public String getloginFomToken(String token) {
		LOG.log(Level.getLevel("WORKLEVEL"), "Method started to work 'getloginFomToken' ");
		return getClaimFromToken(token, Claims::getSubject);
	}

	public Date getIssuedAtDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getIssuedAt);
	}

	public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
	}

	public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		LOG.log(Level.getLevel("WORKLEVEL"), "Method started to work 'getClaimFromToken' ");
		final Claims claims = getAllClaimsFromToken(token);
		LOG.log(Level.getLevel("WORKLEVEL"), "Claims were got successfully' claims: " + claims.getSubject());
		return claimsResolver.apply(claims);
	}

	private Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(JwtConstant.SIGNING_KEY).parseClaimsJws(token).getBody();
	}

	private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
	}

	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		return doGenerateToken(claims, userDetails.getUsername());
	}

	private Date calculateExpirationDate(Date createdDate) {
		return new Date(createdDate.getTime() + 1000 * 100000);
	}

	private String doGenerateToken(Map<String, Object> claims, String username) {
		final Date createdDate = new Date();
		final Date expirationDate = calculateExpirationDate(createdDate);
		return Jwts.builder().setClaims(claims).setSubject(username).setExpiration(expirationDate)
				.signWith(SignatureAlgorithm.HS256, JwtConstant.SIGNING_KEY).compact();
	}

	public String refreshToken(String token) {
		Date createdDate = new Date();
		final Date expirationDate = calculateExpirationDateForRefreshToken(createdDate);
		final Claims claims = getAllClaimsFromToken(token);
		claims.setExpiration(expirationDate);

		return Jwts.builder().setSubject(getloginFomToken(token)).setExpiration(expirationDate)
				.signWith(SignatureAlgorithm.HS256, JwtConstant.SIGNING_KEY).compact();
	}

	private Date calculateExpirationDateForRefreshToken(Date createdDate) {
		return new Date(createdDate.getTime() + 1000 * 1000);
	}

	public Boolean validateToken(String token, UserDetails userDetails) {
		final String login = getloginFomToken(token);
		return login.equals(userDetails.getUsername()) && !isTokenExpired(token);
	}
}
