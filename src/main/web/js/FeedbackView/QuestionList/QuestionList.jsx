import React from 'react';
import QuestionField from '../QuestionField';
import { makeAjaxRequest } from '../../Ajax';
import Loading from '../../Loading';
import config from '../../config';

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
            questionList: [],
            submitting: false,
            loading: true
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
        console.log(response);
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

        let responses = [];
        for (var property in this.state.responses) {
            responses[property - 1] = this.state.responses[property];
        }

        const data = Object.assign({}, { responses: responses}, {
            teacherId: this.props.instructor.id,
            courseId: this.props.course.id,
            userId: config.dummy.userId
        });

        makeAjaxRequest({
            url: config.feedbackApi.submitLink,
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),

            // ugly hack to go back to the course list
            success: message => window.history.back(),
            error: message => console.log(message)
        });

        // show a beautiful loading icon
        this.setState({submitting: true});
    }

    fetchTemplate() {
        makeAjaxRequest({
            url: config.feedbackApi.templateLink,
            type: 'GET',
            success: template => {
                console.log(template);
                this.setState({
                    questionList: template.questionList.map(question => {
                        question = Object.assign({}, question, { validate: true, filled: false })
                        console.log(question);
                        return question;
                    }),
                    loading: false 
                });
            },
            error: message => {
                console.log(message);
                this.setState({
                    loading: false
                })
            }
        });
    }

    componentDidMount() {
        this.fetchTemplate();
    }

    render() {
        console.log("rendering QuestionList with instructor: " + JSON.stringify(this.props.instructor) + ", " + JSON.stringify(this.props.course));
        if (this.state.submitting || this.state.loading) {
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
