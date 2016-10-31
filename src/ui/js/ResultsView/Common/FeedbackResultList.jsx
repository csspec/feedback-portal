import React, { Component } from 'react';
import TakeSomeCoffee from '../../ErrorImages/TakeSomeCoffee';
import ReactPieChart from '../ReactPieChart';

class SingleQuestionResponses extends Component {
    render() {
        return (
            <div className="list-group-item">
                <div className="row">
                    <div className="col-xs-12">
                        <h3>{this.props.question.statement}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-6">
                        <ReactPieChart id={this.props.id} details={this.props.response.details} />
                    </div>
                    <div className="col-xs-6" style={{height: '13em', display: 'flex', alignItems: 'center'}}>
                        <h1 style={{fontSize: '5em', display:'block', margin: 'auto', color: "#636363",fontWeight: 900, verticalAlign: 'middle'}}>{this.props.response.average === "NaN" ? 0 : this.props.response.average.toFixed(1)}</h1>
                    </div>
                </div>
            </div>
        )
    }
}

/*
  {
    "teacherId": "12",
    "responses": [
      {
        "average": "NaN",
        "questionId": 6,
        "details": {
          "A": 0,
          "B": 0,
          "C": 0,
          "D": 0,
          "E": 0
        }
      }
    ],
    "courseId": "2"
  }
*/

// stateless component
export default class FeedbackResultList extends React.Component {
    constructor(props) {
        super(props);
    }

    findQuestion(template, questionId) {
        return template.find(question => {
            return question.questionId == questionId;
        });
    }

    renderDetailsIntoArray(template, responses) {
        return responses.map(response => {
            const question = this.findQuestion(template, response.questionId);
            return {
                question: question,
                response: response,
                id: question.questionId,
            }
        })
    }

    render() {
        const template = this.props.template;
        const responses = this.props.responses.responses;

        let details = this.renderDetailsIntoArray(template, responses);
        if (details[0].response.average === 'NaN')
            details = [];
        let listitems = details.map(question => {
            return (
                <SingleQuestionResponses key={question.id} question={question.question} response={question.response} id={question.id} />
            )
        });

        if (listitems.length < 1) {
            listitems = (
                <TakeSomeCoffee>
                    Noone yet filled the feedback form. May its the time to take some coffee.
                </TakeSomeCoffee>
            );
        }

        return (
            <div className="list-group" style={{
                maxWidth: '700px',
                display: 'block',
                margin: 'auto'
            }}>
                {listitems}
            </div>
        )
    }
}
