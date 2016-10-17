package org.csspec.feedback.db;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * Created by Jatinder Dhawan on 10/16/2016.
 */
public class AcceptedSingleResponse {
    @JsonProperty("QuestionId")
    @Setter @Getter private String questionId;

    @JsonProperty("Response")
    @Setter @Getter private int response;

    public String getQuestionId() {
        return this.questionId;
    }

    public int getResponse() {
        return this.response;
    }

    @Override
    public String toString() {
        return "{ QuestionId : "+this.questionId+",\nReponse"+this.response+"}\n";
    }
}
