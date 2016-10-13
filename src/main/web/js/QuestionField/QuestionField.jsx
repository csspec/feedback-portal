import React from 'react';
import TextBasedQuestion from '../FeedbackQuestionTypes/TextBasedQuestion';
import LevelBasedQuestion from '../FeedbackQuestionTypes/LevelBasedQuestion';
import MultipleChoiceBasedQuestion from '../FeedbackQuestionTypes/MultipleChoiceBasedQuestion';

// required props
//      question:
//          statement - question statement
//          type - one of text, level, multiple
//          prop - 
//              level - in case of level based question
//              options - in case of multiple choice based question
//      count: count of the question
//      label: label of the question must be unique
//      onChange: (required) function of signature function(response)
//                  that will be called on every change
export default class QuestionField extends React.Component {
    constructor(props) {
        super(props);
    }

    registerResponse(response) {
        this.props.onChange({
            questionId: this.props.id,
            questionNumber: this.props.count,
            response: response
        })
    }

    handleChoiceClick(choice) {
        this.registerResponse(choice);
    }

    handleStarClick(rating) {
        this.registerResponse(rating);
    }

    handleTextComplete(text) {
        this.registerResponse(text);
    }

    renderQuestion(question) {
        switch (question.type) {
            case 'text':
                return (
                    <TextBasedQuestion onComplete={this.handleTextComplete.bind(this)}
                    />
                );

            case 'level':
                return (
                    <LevelBasedQuestion level={question.prop.level}
                                        onStarClick={this.handleStarClick.bind(this)}
                    />
                )

            case 'multiple':
                return (
                    <MultipleChoiceBasedQuestion options={question.prop.options}
                                                 onChange={this.handleChoiceClick.bind(this)}
                    /> 
                )
        }
    }

    render() {
        return (
            <div className="well" style={{backgroundColor: 'white', borderRadius: '4px', boxShadow: 'none'}}>
                <small style={{color: 'gray', letterSpacing: '0.1em', fontWeight: '600'}}>{"QUESTION " + this.props.count}</small>
                <h3 style={{fontWeight: 'normal'}}>{this.props.question.statement}</h3>
                {this.renderQuestion(this.props.question)}
            </div>
        )
    }
}
