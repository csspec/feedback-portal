package org.csspec.feedback.api.repo;

import org.csspec.feedback.db.FeedbackStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FeedbackStatusRepository extends MongoRepository<FeedbackStatus, String> {

}
