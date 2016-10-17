package org.csspec.feedback.api.repo;

/**
 * Created by Jatinder Dhawan on 10/17/2016.
 */
public interface AcceptedResponsesOperation {
    public void updateResponseTable(String feedbackId, String questionId, int response);
}
