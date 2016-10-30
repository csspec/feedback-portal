package org.csspec.feedback.controllers;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.csspec.feedback.helpers.Account;
import org.csspec.feedback.helpers.RequestValidator;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class ResultsController {
    @RequestMapping(value = "/results", method = RequestMethod.GET)
    public String resultsView(HttpServletRequest request) {
        Account account = RequestValidator.checkCookie(request);
        System.out.println(account);
        if (account == null || !account.getRole().equals("ADMIN")) {
            return "not_allowed";
        }
        return "results";
    }

    @RequestMapping(value = "/result", method = RequestMethod.GET)
    public String resultView(HttpServletRequest request) {
        Account account = RequestValidator.checkCookie(request);
        System.out.println(account);
        if (account == null || !account.getRole().equals("TEACHER")) {
            return "not_allowed";
        }
        return "result";
    }
}
