import React from 'react';
import QuestionField from '../QuestionField';
import { makeAjaxRequest } from '../../Ajax';
import Loading from '../../Loading';
import config from '../../config';
import Button from '../../Button';

class QuestionListHeading extends React.Component {
    render() {
        return (
            <div className="panel-heading" style={{backgroundColor: 'rgb(47, 164, 191)', color: 'white', border: 'none', boxShadow: 'none'}}>
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
            loading: true,
            handleValidation: false,
        }
    }

    registerChange(response) {
        let responses = this.state.responses;
        responses[response.questionId] = response;

        let questions = this.state.questionList;
        questions = questions.map(question => {
            if (question.questionId === response.questionId) {
                return Object.assign({}, question, { filled: true, validate: true });
            }
            return question;
        })
        this.setState({ responses: responses, questionList: questions });
    }

    validateResponses() {
        let responses = this.state.responses;
        if (Object.keys(responses).length === this.state.questionList.length)
            return true;

        // else we are in problem, some question may not have response
        let questions = this.state.questionList;
        questions = questions.map(question => {
            if (!responses.hasOwnProperty(question.questionId) || !question.filled) {
                return Object.assign({}, question, {validate: false });
            }
            return question;
        });
        console.log(questions);
        this.setState({ questionList: questions, handleValidation: true });
        return false;
    }

    handleSubmit(e) {
        console.log("Submit: handleSubmit");
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
        if (this.state.submitting || this.state.loading) {
            return (
                <div className="panel panel-default"
                    style={{
                        backgroundColor: 'white',
                        maxWidth: '800px',
                        display: 'block',
                        margin: 'auto',
                        boxShadow: '0 0.2em 0.3em lightgray',
                        marginBottom: '5em',
                        border: 0,
                        borderRadius: '3px',
                        padding: '3em'
                    }} 
                >
                    <Loading height={50} />
                </div>
            )
        }

        const questions = this.state.questionList.map((question, key) => {
            return (
                <QuestionField question={question}
                               key={key}
                               count={key+1}
                               id={question.id}
                               validate={question.validate}
                               handleValidation={this.state.handleValidation}
                               onChange={this.registerChange.bind(this)}
                />
            )
        })

        return (
            <form className="panel panel-default" style={{
                backgroundColor: 'white',
                maxWidth: '800px',
                display: 'block',
                margin: 'auto',
                border: 0,
                borderRadius: '3px',
                boxShadow: '0 0.2em 0.3em lightgray',
                marginBottom: '5em'
            }} onSubmit={this.handleSubmit.bind(this)} >
                <QuestionListHeading instructor={this.props.instructor} course={this.props.course} />
                <div className="panel-body" style={{padding: 0}}>
                    {questions}
                </div>
                <Button style={{ color: 'rgb(47, 164, 191)', marginLeft: 'auto', display: 'block', width: '50%'}} type="submit">Submit</Button>
            </form>
        )
    }
}
