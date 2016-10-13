import React from 'react';
import QuestionField from '../QuestionField';

class QuestionListHeading extends React.Component {
    render() {
        return (
            <div className="panel-heading">
                <div className="panel-title">
                    <div className="row">
                        <div className="col-xs-6">
                            <strong>Course Code: </strong>
                            {this.props.course.id} ({this.props.course.name})
                        </div>
                        <div className="col-xs-6 text-right">
                            <strong> Instructor: </strong>
                            Prof. {this.props.instructor.name}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
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
            <div className="panel panel-default" style={{backgroundColor: 'white'}} >
                <QuestionListHeading instructor={this.props.instructor} course={this.props.course} />
                <div className="panel-body">
                    {questions}
                </div>
            </div>
        )
    }
}
