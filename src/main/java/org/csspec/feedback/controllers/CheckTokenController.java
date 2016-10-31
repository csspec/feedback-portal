package org.csspec.feedback.controllers;

import org.apache.catalina.connector.Request;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.csspec.feedback.config.Jwt;
import org.csspec.feedback.helpers.Account;
import org.csspec.feedback.helpers.RequestValidator;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.TimeZone;

@RestController
public class CheckTokenController {

    private static final String COOKIE_NAME = "FEEDBACK_CSSPEC";
    private static final String SESSION_COOKIE_NAME = "CSS_FEEDBACK_SESSION_USER_ID";
    private static final String SESSION_TOKEN = "SESSION_ACCESS_TOKEN";
    // store the secret as an environment variable
    private static final String SECRET = "secret";
    private static final String CLIENT = "feedback";

    private static class Token {
        private String hash;

        public Token() {}

        public void setHash(String hash) {
            this.hash = hash;
        }

        public String getHash() {
            return hash;
        }
    }

    @RequestMapping(value = "/check_token", method = RequestMethod.POST)
    public ResponseEntity<?> checkToken(@RequestBody Token request) {
        String hash = request.getHash();
        System.out.println("Handling check_token: hash: " + hash);
        String redirect_uri = "/error?error_type=invalid_token&token=" + hash;
        Account account = RequestValidator.validateRequest(hash);
        if (account != null) {
            switch (account.getRole()) {
                case "STUDENT":
                    redirect_uri = "/list";
                    break;
                case "ADMIN":
                    redirect_uri = "/results";
                    break;
                case "TEACHER":
                    redirect_uri = "/result";
                    break;
            }
            HttpHeaders header = new HttpHeaders();
            Date expdate= new Date();
            expdate.setTime (expdate.getTime() + (3600 * 1000));
            DateFormat df = new SimpleDateFormat("EEE, dd-MMM-yyyy HH:mm:ss zzz");
            df.setTimeZone(TimeZone.getTimeZone("GMT"));
            String cookieExpire = df.format(expdate);
            header.set("Set-Cookie",  COOKIE_NAME + "=" + Jwt.getJwt(hash) + "; Expires=" + cookieExpire);
            return new ResponseEntity<Object>(Collections.singletonMap("redirect_uri", redirect_uri),
                                              header,
                                              HttpStatus.OK);
        }
        return new ResponseEntity<Object>(Collections.singletonMap("redirect_uri", redirect_uri), HttpStatus.OK);
    }

    @RequestMapping("/user")
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        Account account = RequestValidator.checkCookie(request);
        if (account == null) {
            return new ResponseEntity<>(Collections.singletonMap("message", "not found"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

    @RequestMapping("/user_courses")
    public ResponseEntity<?> getUserCourses(HttpServletRequest request) {
        Account account = RequestValidator.checkCookie(request);
        if (account == null) {
            return new ResponseEntity<>(Collections.singletonMap("message", "not found"), HttpStatus.NOT_FOUND);
        }

        if (!account.getRole().equals("STUDENT"))
            return new ResponseEntity<>(Collections.singletonMap("message", "not a student"), HttpStatus.BAD_REQUEST);

        return new ResponseEntity<Object>(account, HttpStatus.OK);
    }
}
