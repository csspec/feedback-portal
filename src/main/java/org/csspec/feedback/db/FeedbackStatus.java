package org.csspec.feedback.db;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

public class FeedbackStatus {
    @JsonProperty("FeedbackId")
    @Getter	@Setter private String feedbackId;

    @JsonProperty("UserId")
    @Getter @Setter private String userId;

    FeedbackStatus(){}
}