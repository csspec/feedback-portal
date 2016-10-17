package org.csspec.feedback.db;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

public class Responses {
    @JsonProperty("FeedbackId")
    @Getter @Setter private String feedbackId;

    @JsonProperty("QuestionId")
    @Getter @Setter private String questionId;

    @JsonProperty("ResponseList")
    @Getter @Setter private SingleResponse responseList;

    public SingleResponse getResponseList() {
        return this.responseList;
    }

}
