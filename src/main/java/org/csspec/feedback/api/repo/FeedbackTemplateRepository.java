package org.csspec.feedback.api.repo;

import org.csspec.feedback.db.FeedbackTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Jatinder Dhawan on 10/16/2016.
 */
public interface FeedbackTemplateRepository extends MongoRepository<FeedbackTemplate,String> {
    public FeedbackTemplate getFeedbackTemplateByFeedbackId(String feedbackId);
}
