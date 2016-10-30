import React from 'react';
import FeedbackResultList from '../Common/FeedbackResultList';
import Loading from '../../Loading';

export default class TeacherFeedbackResult extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            responses: [],
            template: [],
            teacher: {},
            course: {},
            total: 4,
            progress: 0
        }
    }

    handleTemplate(template) {
        console.log("Handling template");
        this.setState((prevState, prop) => ({ template: template, progress: prevState.progress + 1}));
    }

    handleCourse(course) {
        console.log("Handling course");
        this.setState((prevState, prop) => ({course: course, progress: prevState.progress + 1}));
    }

    handleTeacher(teacher) {
        console.log("Hanlding teacher");
        this.setState((prevState, prop) => ({teacher: teacher, progress: prevState.progress + 1}));
    }

    handleTeachersFeedback(responses) {
        console.log("Handling feedback");
        responses = responses.find(element => {
            return element.courseId === this.props.params.courseId;
        });
        console.log(responses);
        this.setState((prevState, prop) => ({ responses: responses, progress: prevState.progress + 1}));
    }

    componentDidMount() {
        window.fbApi.getFeedbackTemplate(this.handleTemplate.bind(this), console.log);
        window.fbApi.getCoursesFeedbackForTeacher(this.props.params.teacherId, this.handleTeachersFeedback.bind(this), console.log);
        window.fbApi.getTeacherByTeacherId(this.props.params.teacherId, this.handleTeacher.bind(this), console.log);
        window.fbApi.getCourseByCourseId(this.props.params.courseId, this.handleCourse.bind(this), console.log);
    }

    render() {
        console.log(this.state.progress + '/' + this.state.total);
        if (this.state.progress !== this.state.total) {
            return (
                <div key="loader4" style={{
                        borderRadius: '2px',
                        border: '1px solid lightgray',
                        maxWidth: '400px',
                        display: 'block',
                        margin: 'auto',
                        padding: '3em'
                    }}>
                    <Loading height={50} showProgress={true} progress={this.state.progress} total={this.state.total} />
                </div>
            )
        }
        return (
            <div className="panel panel-default">
                <div className="well" style={{
                    backgroundColor: 'rgb(66, 139, 202)',
                    border: 0,
                    borderRadius: '2px',
                    color: 'white'
                }}>
                    <div className="row">
                        <div className="col-xs-6 col-sm-6"><h2>{this.state.teacher.common.userName}</h2></div>
                        <div className="col-xs-6 col-sm-6 text-right"><h2>{this.state.course.courseName}</h2></div>
                    </div>
                </div>
                <FeedbackResultList template={this.state.template} responses={this.state.responses} />
            </div>
        )
    }
}
