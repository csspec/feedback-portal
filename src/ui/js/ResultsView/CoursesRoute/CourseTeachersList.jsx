import React from 'react';
import { Link } from 'react-router';
import SlideInUp from '../../Transitions/SlideInUp';
import { makeAjaxRequest } from '../../Ajax';
import config from '../../config';
import Button from '../../Button';
import Loading from '../../Loading';
import NothingFound from '../../ErrorImages/NothingFound';
import SideBar from '../../NavigationPane/SideBar';
import { StudentList } from '../StudentsStatusRoute/StudentFilter';

const loader = (
    <div key="loader3" style={{
                borderRadius: '2px',
                border: '1px solid lightgray',
                maxWidth: '400px',
                display: 'block',
                margin: 'auto',
                padding: '3em'
            }}>
        <Loading height={50} />
    </div>
);

class ListItem extends React.Component {
    render() {
        return (
            <div className="list-group-item btn btn-default"
                    style={{outline: 0, border: 'none', textAlign: 'left', padding: 0}}>
                    <Link to={ "/courses/" + this.props.courseId + '/' + this.props.teacher.common.userId } className="row">
                        <div className="col-xs-2 col-sm-2" style={{display: 'flex', alignItems: 'center'}}>
                            <span className="material-icons" style={{fontSize: '50px'}}>account_circle</span>
                        </div>
                        <div className="col-xs-6 col-sm-6">
                            <strong style={{display: 'block'}}>{this.props.teacher.common.userName}</strong>
                            <small style={{display: 'block', color: 'gray'}}>{this.props.teacher.common.email}</small>
                        </div>
                        <div className="col-xs-4 col-sm-4">
                            { /* we have to somehow utilize this space */ }
                        </div>
                    </Link>
            </div>
        );
    }
}

class CoursesListGroup extends React.Component {
    render() {
        let listitems = this.props.list.map(teacher => {
            return (
                <ListItem courseId={this.props.courseId} teacher={teacher} key={teacher.common.userId} /> 
            );
        });

        if (listitems.length < 1) {
            listitems = (
                <NothingFound>
                    Bummer! Nothing found here.
                </NothingFound>
            );
        }
        return (
            <div>
                <div className="list-group" style={{
                    borderRadius: '2px',
                    border: (!listitems.length ? 'none': '1px solid lightgray'),
                    maxWidth: '768px',
                    display: 'block',
                    margin: 'auto'
                }}>
                    {listitems}
                </div>
                <br />
                <div style={{
                    borderRadius: '2px',
                    border: '1px solid lightgray',
                    maxWidth: '768px',
                    display: 'block',
                    margin: 'auto',
                }}>
                    <small style={{padding: '8px'}}>Students who have not yet filled feedback form in this course</small>
                    <StudentList courseId={this.props.courseId} />
                </div>
            </div>
        );
    }
}

export default class CourseTeachersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherList: [],
            total: 2,
            progress: 0,
        };
    }

    handleTeacher(teacher) {
        const newlist = this.state.teacherList;
        console.log(teacher);
        newlist.push(teacher);
        this.setState((prevState, prop) => ({teacherList: newlist, progress: prevState.progress + 1 }));
    }

    handleCoursesFeedback(list) {
        this.setState((prevState, props) => ({total: prevState.total + list.length, progress: prevState.progress + 1}));
        list.forEach(feedback => {
            fbApi.getTeacherByTeacherId(feedback.teacherId, this.handleTeacher.bind(this), console.log);
        });
    }

    fetchCourseFeedbackList() {
        window.fbApi.getCoursesFeedbackForCourse(this.props.params.courseId,
            this.handleCoursesFeedback.bind(this),
            error => console.log(error)
        );
        window.fbApi.getCourseByCourseId(this.props.params.courseId, course => {
            this.setState((prevState, props) => ({course: course, progress: prevState.progress + 1}));
        }, console.log);
    }

    componentDidMount() {
        this.fetchCourseFeedbackList();
    }

    render() {
        let view = (this.state.progress >= this.state.total)
                    ? <CoursesListGroup key="courseList" courseId={this.props.params.courseId} list={this.state.teacherList} />
                    : loader;
        return (
            <div className="row"  style={{margin: 0}}>
                <div className="sidebar col-sm-2" style={{margin: 0}}>
                    <SideBar />
                </div>
                <div className="rest col-sm-10" style={{margin: 0, padding: 0}}>
                <nav className="navbar navbar-default" style={{
                    border: 0
                }}>
                    <div className="row" style={{
                        maxWidth: '800px',
                        display: 'block',
                        margin: 'auto'
                    }}>
                        <div className="col-xs-2 col-sm-2">
                            <Link to={'/teachers'}>
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
                        <div className='col-xs-10 col-sm-10 text-center'>
                            <h4>
                                Course feedback according to the instructor
                            </h4>
                        </div>
                    </div>
                </nav>
                <SlideInUp>
                    {view}
                </SlideInUp>
                </div>
            </div>
        );
    }
}

