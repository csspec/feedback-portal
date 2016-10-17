package org.csspec.feedback.db;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by Jatinder Dhawan on 10/16/2016.
 */
public class Question {
    @JsonProperty("QuestionId")
    @Getter @Setter private String questionId;

    @JsonProperty("QuestionStatement")
    @Getter @Setter private String questionStatement;
}
