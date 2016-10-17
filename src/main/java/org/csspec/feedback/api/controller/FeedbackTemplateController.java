package org.csspec.feedback.api.controller;

import org.csspec.feedback.api.repo.FeedbackTemplateRepository;
import org.csspec.feedback.db.FeedbackTemplate;
import org.csspec.feedback.db.Question;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Jatinder Dhawan on 10/16/2016.
 */
@RestController
public class FeedbackTemplateController {
    @Autowired
    private FeedbackTemplateRepository feedbackTemplateRepository;

    /* Make a new org.csspec.feedback form */
    @RequestMapping(value = "/org/csspec/feedback/new", method = RequestMethod.POST)
    public void storeFeedbackTemplate(@RequestBody FeedbackTemplate feedbackTemplate) {
        feedbackTemplateRepository.save(feedbackTemplate);
        System.out.println("Made a new feedbackTemplate");
    }

    /* Get questions of a given org.csspec.feedback id */
    @RequestMapping(value = "/org/csspec/feedback/{feedbackId}", method = RequestMethod.GET)
    public List<Question> getFeedbackQuestions(@PathVariable String feedbackId) {
        System.out.println("Print this");
        FeedbackTemplate temp = feedbackTemplateRepository.getFeedbackTemplateByFeedbackId(feedbackId);
        return temp.getQuestionList();
    }

}
