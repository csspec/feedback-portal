package org.csspec.feedback.api.controller;

import org.csspec.feedback.api.repo.FeedbackStatusRepository;
import org.csspec.feedback.db.FeedbackStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class FeedbackStatusController {
    @Autowired
    private FeedbackStatusRepository feedbackStatusRepository;

    /* Get org.csspec.feedback status of given org.csspec.feedback id for a given user */
    @RequestMapping(value = "/feedback/{feedbackId}/users/{userId}", method = RequestMethod.GET)
    public void getFeedbackStatus(@PathVariable String feedbackId, @PathVariable String userId) {
        System.out.println("Reached into this");
        boolean x = feedbackStatusRepository.exists("{'feedbackId':"+feedbackId+ ",'userId': "+userId+"}");
        System.out.println(x);
    }

    /* Store org.csspec.feedback status of a given userid for a given feedbackId */
    @RequestMapping(value = "/feedback/users/submit", method = RequestMethod.POST)
    public void storeFeedbackStatus(@RequestBody FeedbackStatus feedbackStatus) {
        feedbackStatusRepository.save(feedbackStatus);
        System.out.println("Recorded org.csspec.feedback status");
    }
}