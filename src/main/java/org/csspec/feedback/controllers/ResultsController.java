package org.csspec.feedback.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/results")
public class ResultsController {
    @RequestMapping(method = RequestMethod.GET)
    public String resultsView() {
        return "results";
    }
}
