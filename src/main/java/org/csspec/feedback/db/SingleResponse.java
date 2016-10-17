package org.csspec.feedback.db;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

public class SingleResponse {
    @JsonProperty("OptionOne")
    @Getter @Setter private int optionOne;

    @JsonProperty("OptionTwo")
    @Getter @Setter private int optionTwo;

    @JsonProperty("OptionThree")
    @Getter @Setter private int optionThree;

    @JsonProperty("OptionFour")
    @Getter @Setter private int optionFour;

    @JsonProperty("OptionFive")
    @Getter @Setter private int optionFive;

    SingleResponse() {
        optionOne = optionTwo = optionThree = optionFour = optionFive = 0;
    }

    public int getOptionOne(){
        return this.optionOne;
    }

    public int getOptionTwo(){
        return this.optionTwo;
    }

    public int getOptionThree(){
        return this.optionThree;
    }

    public int getOptionFour(){
        return this.optionFour;
    }

    public int getOptionFive(){
        return this.optionFive;
    }
}