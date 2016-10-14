package org.csspec.feedback.config;

import com.auth0.jwt.JWTSigner;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.JWTVerifyException;

import java.util.HashMap;
import java.util.Map;

public class Jwt {
    private static final String KEY = "temp";

    private static final String ISSUER = "https://csspec.org";

    private static final JWTSigner signer = new JWTSigner(KEY);

    public static String getJwt(String message) {
        return getJwt(message, null);
    }

    public static String getJwt(String message, String scope) {
        final long iat = System.currentTimeMillis();
        // token will expire in 1 hour
        final long exp = iat + 60 * 60 * 60;

        final HashMap<String, Object> claims = new HashMap<>();

        claims.put("iss", ISSUER);
        claims.put("iat", iat);
        claims.put("exp", exp);
        claims.put("sub", message);
        if (scope != null && scope.length() != 0)
            claims.put("scope", scope);
        return signer.sign(claims);
    }

    public static String verifyJwt(String token) throws Exception {
        return (String)getClaims(token).get("sub");
    }

    public static Map<String, Object> getClaims(String token) throws Exception {
        final JWTVerifier verifier = new JWTVerifier(KEY);
        final Map<String, Object> claims = verifier.verify(token);

        if (!claims.get("iss").equals(ISSUER))
            throw new JWTVerifyException("unable to verify token");
        return claims;
    }
}
