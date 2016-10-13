import React from 'react';
import QuestionField from '../QuestionField';

export default class QuestionList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            responses: {}
        }
    }

    registerChange(response) {
        console.log(response);
    }

    render() {
        const questions = this.props.questionList.map((question, key) => {
            return (
                <QuestionField question={question}
                               key={key}
                               count={key+1}
                               id={question.id}
                               onChange={this.registerChange.bind(this)}
                />
            )
        })

        return (
            <div className="well" style={{backgroundColor: 'white'}} >
                {questions}
            </div>
        )
    }
}
