import React from 'react';
import QuestionField from '../QuestionField';
import { makeAjaxRequest } from '../../Ajax';
import Loading from '../../Loading';

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
            responses: {},
            questionList: props.questionList.map(question => Object.assign({}, question, { validate: true, filled: false })),
            submitting: false
        }
    }

    registerChange(response) {
        let responses = this.state.responses;
        responses[response.questionId] = response;

        let questions = this.state.questionList;
        questions = questions.map(question => {
            if (question.id === response.questionId)
                return Object.assign({}, question, { filled: true, validate: true });
            return question;
        })
        console.log(questions);
        this.setState({ responses: responses, questionList: questions });
    }

    validateResponses() {
        let responses = this.state.responses;
        if (Object.keys(responses).length === this.state.questionList.length)
            return true;

        // else we are in problem, some question may not have response
        let questions = this.state.questionList;
        questions = questions.map(question => {
            if (!responses.hasOwnProperty(question.id) || !question.filled) {
                return Object.assign({}, question, {validate: false });
            }
            return question;
        });
        this.setState({ questionList: questions });
        return false;
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.validateResponses())
            return false;

        const data = Object.assign({}, this.state.responses, {
            instructor_id: this.props.instructor.id,
            course_id: this.props.course.id
        });

        makeAjaxRequest({
            url: '/feedback/response/submit',
            method: 'POST',
            data: data,
            success: message => console.log("Done!", message),
            error: message => console.log(message)
        });

        // show a beautiful loading icon
        this.setState({submitting: true});
    }

    render() {
        if (this.state.submitting) {
            return (
                <Loading />
            )
        }

        const questions = this.state.questionList.map((question, key) => {
            return (
                <QuestionField question={question}
                               key={key}
                               count={key+1}
                               id={question.id}
                               validate={question.validate}
                               onChange={this.registerChange.bind(this)}
                />
            )
        })

        return (
            <form className="panel panel-default" style={{backgroundColor: 'white'}} onSubmit={this.handleSubmit.bind(this)} >
                <QuestionListHeading instructor={this.props.instructor} course={this.props.course} />
                <div className="panel-body">
                    {questions}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}
