package org.csspec.feedback.api.repo;

import org.csspec.feedback.db.AcceptedResponses;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by Jatinder Dhawan on 10/16/2016.
 */
public interface AcceptedResponsesRepository extends MongoRepository<AcceptedResponses,String>,AcceptedResponsesOperation {

}
