package org.csspec.feedback.helpers;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.csspec.feedback.config.Jwt;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.Cookie;
import java.util.ArrayList;
import java.util.List;

public class RequestValidator {
    static public final String uri = "http://139.59.36.12:8090/oauth/check_token";
    private static final String COOKIE_NAME = "FEEDBACK_CSSPEC";
    private static final String SESSION_COOKIE_NAME = "CSS_FEEDBACK_SESSION_USER_ID";
    private static final String SESSION_TOKEN = "SESSION_ACCESS_TOKEN";
    // store the secret as an environment variable
    private static final String SECRET = "secret";
    private static final String CLIENT = "feedback";

    public static Account validateRequest(String hash) {
        List<ClientHttpRequestInterceptor> interceptors = new ArrayList<>();
        interceptors.add(new HeaderRequestInterceptor("Authorization", "Bearer " + hash));
        interceptors.add(new HeaderRequestInterceptor("x-auth-token", "client_id=" + CLIENT + "&client_secret=" + SECRET));
        interceptors.add(new HeaderRequestInterceptor("Content-Type", "application/json"));
        RestTemplate template = new RestTemplate();
        template.setInterceptors(interceptors);
        return template.postForObject(RequestValidator.uri, null, Account.class);
    }

    public static Account checkCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null)
            return null;
        String cookiePayload = "";
        for (Cookie cookie :
                cookies) {
            if (cookie.getName().equals(COOKIE_NAME)) {
                cookiePayload = cookie.getValue();
                break;
            }
        }
        if (cookiePayload.equals("")) {
            System.out.println(COOKIE_NAME + " was null or \"\"");
            return null;
        }

        String hash = "";
        try {
            hash = Jwt.verifyJwt(cookiePayload);
        } catch (Exception e) {
            System.out.println("Unable to verify token: " + e.toString());
            return null;
        }
        return validateRequest(hash);
    }

}
