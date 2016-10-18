package org.csspec.feedback.controllers;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.csspec.feedback.config.Jwt;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.Map;
import java.util.TimeZone;

@RestController
@RequestMapping("/check_token")
public class CheckTokenController {

    private static final String COOKIE_NAME = "feedback_csspec_org";

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
        if (checkValidity(hash)) {
            return true;
        }
        return false;
    }

    public static boolean checkValidity(String hash) {
        // TODO: make a request to auth server to check the validity of the token
        try {
            Thread.sleep(20000);
        } catch (Exception e) {
            System.out.println(e);
        }
        return true;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> checkToken(Map<String, String> request) {
        String hash = request.get("hash");
        String redirect_uri = "/error?error_type=invalid_token&token=" + hash;
        if (checkValidity(hash)) {
            redirect_uri = "/list";
            HttpHeaders header = new HttpHeaders();
            Date expdate= new Date();
            expdate.setTime (expdate.getTime() + (3600 * 1000));
            DateFormat df = new SimpleDateFormat("EEE, dd-MMM-yyyy HH:mm:ss zzz");
            df.setTimeZone(TimeZone.getTimeZone("GMT"));
            String cookieExpire = "expires=" + df.format(expdate);
            header.set("Set-Cookie", COOKIE_NAME + "=" + Jwt.getJwt(hash) + "; Expires=" + cookieExpire);
            return new ResponseEntity<Object>(Collections.singletonMap("redirect_uri", redirect_uri),
                                              header,
                                              HttpStatus.OK);
        }
        return new ResponseEntity<Object>(Collections.singletonMap("redirect_uri", redirect_uri), HttpStatus.OK);
    }
}
