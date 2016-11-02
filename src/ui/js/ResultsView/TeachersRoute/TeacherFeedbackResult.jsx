import React from 'react';
import FeedbackResultList from '../Common/FeedbackResultList';
import Loading from '../../Loading';
import SlideInUp from '../../Transitions/SlideInUp';
import Button from '../../Button';
import { Link } from 'react-router';
import SideBar from '../../NavigationPane/SideBar';

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
        };
    }

    handleTemplate(template) {
        this.setState((prevState, prop) => ({ template: template, progress: prevState.progress + 1}));
    }

    handleCourse(course) {
        this.setState((prevState, prop) => ({course: course, progress: prevState.progress + 1}));
    }

    handleTeacher(teacher) {
        this.setState((prevState, prop) => ({teacher: teacher, progress: prevState.progress + 1}));
    }

    handleTeachersFeedback(responses) {
        responses = responses.find(element => {
            return element.courseId === this.props.params.courseId;
        });
        this.setState((prevState, prop) => ({ responses: responses, progress: prevState.progress + 1}));
    }

    componentDidMount() {
        window.fbApi.getFeedbackTemplate(this.handleTemplate.bind(this), console.log);
        window.fbApi.getCoursesFeedbackForTeacher(this.props.params.teacherId, this.handleTeachersFeedback.bind(this), console.log);
        window.fbApi.getTeacherByTeacherId(this.props.params.teacherId, this.handleTeacher.bind(this), console.log);
        window.fbApi.getCourseByCourseId(this.props.params.courseId, this.handleCourse.bind(this), console.log);
    }

    render() {
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
            );
        }
        return (
            <div className="row"  style={{margin: 0}}>
                <div className="sidebar col-sm-2" style={{margin: 0}}>
                    <SideBar />
                </div>
                <div className="rest col-sm-10" style={{margin: 0, padding: 0}}>
                <nav className="navbar navbar-default" style={{
                    border: 0,
                    borderRadius: '2px',
                }}>
                    <div className="row" style={{
                        margin: 0,
                        maxWidth: '800px',
                        display: 'flex',
                        margin: 'auto',
                        alignItems: 'center'
                    }}>
                        <div className="col-xs-2 col-sm-2">
                            <Link to={'/teachers/' + this.props.params.teacherId}>
                                <Button style={{
                                    maxWidth: 0,
                                    height: 'auto',
                                    padding: '1em',
                                    margin: 'auto',
                                    display: 'block',
                                    borderRadius: '3em',
                                    background: 'none',
                                }}><span className="material-icons">arrow_back</span></Button>
                            </Link>
                        </div>
                        <div className="col-xs-5 col-sm-5">
                            <Link to={'/teachers/' + this.props.params.teacherId}>
                                <h4>{this.state.teacher.common.userName}</h4>
                            </Link>
                        </div>
                        <div className="col-xs-5 col-sm-5 text-right">
                            <Link to={'/courses/' + this.props.params.courseId}>
                                <h4>{this.state.course.courseName}</h4>
                            </Link>
                        </div>
                    </div>
                </nav>
                <SlideInUp>
                    <FeedbackResultList template={this.state.template} responses={this.state.responses} />
                </SlideInUp>
                </div>
            </div>
        )
    }
}
