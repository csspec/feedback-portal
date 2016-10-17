package org.csspec.feedback.db;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

public class FeedbackTemplate {

    @JsonProperty("FeedbackId")
    @Setter @Getter private String feedbackId;

    @JsonProperty("CourseId")
    @Getter @Setter private String courseId;

    @JsonProperty("AdminId")
    @Getter @Setter private List<String> adminId;

    @JsonProperty("Description")
    @Getter @Setter private String description;

    @JsonProperty("IsOfficial")
    @Getter @Setter private int isOfficial;
/*  1 for official feedbacks and 0 for non-official feedbacks,
    later enum could be added for different societies for directly finding their org.csspec.feedback forms
 */
    @JsonProperty("QuestionList")
    @Getter @Setter private List<Question> question = new ArrayList<Question>();

    public List<Question> getQuestionList() {
        return this.question;
    }
}