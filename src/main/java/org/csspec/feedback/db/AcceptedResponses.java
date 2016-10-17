package org.csspec.feedback.db;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

public class AcceptedResponses {
    @JsonProperty("FeedbackId")
    @Getter @Setter private String feedbackId;

    @JsonProperty("Responses")
    @Getter @Setter private List<AcceptedSingleResponse> responses = new ArrayList<AcceptedSingleResponse>();

    public List<AcceptedSingleResponse> getResponses() {
        return this.responses;
    }

    public String getFeedbackId() {
        return this.feedbackId;
    }

    @Override
    public String toString() {
        String abc = "{FeedbackId : "+feedbackId+",Responses : [\n";
        for(int i=0;i<responses.size();i++) {
            abc = abc + responses.get(i);
        }
        abc = abc + "\n";
        return abc;
    }
}