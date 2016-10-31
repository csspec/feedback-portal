package org.csspec.feedback.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping("/")
    public String home() {
        return "home";
    }

    @RequestMapping(value = { "/list", "/form"})
    public String feedback() {
        return "index";
    }
}
