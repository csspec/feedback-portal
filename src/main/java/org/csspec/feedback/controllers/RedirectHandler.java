package org.csspec.feedback.controllers;

import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/redirected")
public class RedirectHandler {
    @RequestMapping(method = RequestMethod.GET)
    public String handler(RequestEntity<?> entity, Model model) {
        return "redirect_handler";
    }
}
