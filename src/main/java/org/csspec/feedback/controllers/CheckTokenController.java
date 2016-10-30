package org.csspec.feedback.controllers;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.csspec.feedback.config.Jwt;
import org.csspec.feedback.helpers.Account;
import org.csspec.feedback.helpers.HeaderRequestInterceptor;
import org.omg.PortableInterceptor.ClientRequestInterceptor;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.Cookie;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("/check_token")
public class CheckTokenController {

    private static final String COOKIE_NAME = "feedback_csspec_org";
    private static final String SESSION_COOKIE_NAME = "CSS_FEEDBACK_SESSION_USER_ID";
    // store the secret as an environment variable
    private static final String SECRET = "secret";
    private static final String CLIENT = "feedback";

    public static boolean checkCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String cookiePayload = "";
        for (Cookie cookie :
                cookies) {
            if (cookie.getName().equals(COOKIE_NAME)) {
                cookiePayload = cookie.getValue();
                break;
            }
        }
        if (cookiePayload.equals("")) {
            return false;
        }

        String hash = "";
        try {
            hash = Jwt.verifyJwt(cookiePayload);
        } catch (Exception e) {
            System.out.println(e);
            return false;
        }
        return checkValidity(hash) != null;
    }


    public static Map<String, String> checkValidity(String hash) {
        final String uri = "http://139.59.36.12:8090/oauth/check_token";
        System.out.println("Checking token: " + hash);

        List<ClientHttpRequestInterceptor> interceptors = new ArrayList<>();
        interceptors.add(new HeaderRequestInterceptor("Authorization", "Bearer " + hash));
        interceptors.add(new HeaderRequestInterceptor("x-auth-token", "client_id=" + CLIENT + "&client_secret=" + SECRET));
        interceptors.add(new HeaderRequestInterceptor("Content-Type", "application/json"));
        RestTemplate template = new RestTemplate();
        template.setInterceptors(interceptors);
        Account account = template.postForObject(uri, null, Account.class);
        return Collections.singletonMap("user_id", account.getUserid());
    }

    public static class Token {
        private String hash;

        public Token() {}

        public void setHash(String hash) {
            this.hash = hash;
        }

        public String getHash() {
            return hash;
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> checkToken(@RequestBody Token request) {
        String hash = request.getHash();
        System.out.println("Handling check_token: hash: " + hash);
        String redirect_uri = "/error?error_type=invalid_token&token=" + hash;
        Map<String, String> map = checkValidity(hash);
        if (map != null) {
            redirect_uri = "/list";
            HttpHeaders header = new HttpHeaders();
            Date expdate= new Date();
            expdate.setTime (expdate.getTime() + (3600 * 1000));
            DateFormat df = new SimpleDateFormat("EEE, dd-MMM-yyyy HH:mm:ss zzz");
            df.setTimeZone(TimeZone.getTimeZone("GMT"));
            String cookieExpire = "expires=" + df.format(expdate);
            header.set("Set-Cookie", COOKIE_NAME + "=" + Jwt.getJwt(hash) + "; Expires=" + cookieExpire);
            header.set("Set-Cookie", SESSION_COOKIE_NAME + "=" + map.get("user_id"));
            return new ResponseEntity<Object>(Collections.singletonMap("redirect_uri", redirect_uri),
                                              header,
                                              HttpStatus.OK);
        }
        return new ResponseEntity<Object>(Collections.singletonMap("redirect_uri", redirect_uri), HttpStatus.OK);
    }
}
