import React from 'react';
import { Link } from 'react-router';
import SlideInUp from '../../Transitions/SlideInUp';
import { makeAjaxRequest } from '../../Ajax';
import config from '../../config';
import Button from '../../Button';
import SideBar from '../../NavigationPane/SideBar';
import Loading from '../../Loading';
import NothingFound from '../../ErrorImages/NothingFound';

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
                    <Link to={ "/teachers/" + this.props.teacherId + '/' + this.props.course.courseId } className="row">
                        <div className="col-xs-2 col-sm-2" style={{display: 'flex', alignItems: 'center'}}>
                            <span className="material-icons" style={{fontSize: '50px'}}>library_books</span>
                        </div>
                        <div className="col-xs-6 col-sm-6">
                            <strong style={{display: 'block'}}>{this.props.course.name}</strong>
                            <small style={{display: 'block', color: 'gray'}}>{this.props.course.courseId}</small>
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
        let listitems = this.props.list.map(course => {
            return (
                <ListItem teacherId={this.props.teacherId} course={course} key={course.courseId} /> 
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
            <div className="list-group" style={{
                borderRadius: '2px',
                border: (!listitems.length ? 'none': '1px solid lightgray'),
                maxWidth: '768px',
                display: 'block',
                margin: 'auto'
            }}>
                {listitems}
            </div>
        );
    }
}

export default class TeacherCoursesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coursesList: [],
            total: 2,
            progress: 0,
        };
    }

    handleCourseFetch(course) {
        let newlist = this.state.coursesList;
        newlist.push(course);
        this.setState((prevState, prop) => ({coursesList: newlist, progress: prevState.progress + 1 }));
    }

    handleCoursesFeedback(list) {
        this.setState((prevState, props) => ({total: prevState.total + list.length, progress: prevState.progress + 1}));
        list.map(feedback => {
            fbApi.getCourseByCourseId(feedback.courseId, this.handleCourseFetch.bind(this), console.log);
        });
    }

    fetchTeacherFeedbacksList() {
        window.fbApi.getCoursesFeedbackForTeacher(this.props.params.teacherId,
            this.handleCoursesFeedback.bind(this),
            error => console.log(error)
        );
        window.fbApi.getTeacherByTeacherId(this.props.params.teacherId, teacher => {
            this.setState((prevState, props) => ({teacher: teacher, progress: prevState.progress + 1}));
        }, console.log);
    }

    componentDidMount() {
        this.fetchTeacherFeedbacksList();
    }

    render() {
        let view = (this.state.progress >= this.state.total)
                    ? <CoursesListGroup key="courseList" teacherId={this.props.params.teacherId} list={this.state.coursesList} />
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
                            Courses taught by {(this.state.teacher)
                                                ? this.state.teacher.common.userName
                                                : <small>Loading...</small>}
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

