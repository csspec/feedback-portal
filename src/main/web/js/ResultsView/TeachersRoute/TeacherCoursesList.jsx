import React from 'react';
import { Link } from 'react-router';
import SlideInUp from '../../Transitions/SlideInUp';
import { makeAjaxRequest } from '../../Ajax';
import config from '../../config';
import Button from '../../Button';
import Loading from '../../Loading';

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
)

class ListItem extends React.Component {
    render() {
        return (
            <Button className="list-group-item"
                    style={{outline: 0, border: 'none', padding: '1em'}}>
                    <Link to={ "/teachers/" + this.props.teacherId + '/' + this.props.course.courseId } className="row">
                        <div className="col-xs-2 col-sm-2" style={{display: 'flex', alignItems: 'center'}}>
                            <span className="material-icons" style={{fontSize: '50px'}}>library_books</span>
                        </div>
                        <div className="col-xs-6 col-sm-6">
                            <strong style={{display: 'block'}}>{this.props.course.courseName}</strong>
                            <small style={{display: 'block', color: 'gray'}}>{this.props.course.courseId}</small>
                        </div>
                        <div className="col-xs-4 col-sm-4">
                            { /* we have to somehow utilize this space */ }
                        </div>
                    </Link>
            </Button>
        )
    }
}

class CoursesListGroup extends React.Component {
    render() {
        let listitems = this.props.list.map(course => {
            return (
                <ListItem teacherId={this.props.teacherId} course={course} key={course.courseId} /> 
            )
        })
        return (
            <div className="list-group" style={{
                borderRadius: '2px',
                border: '1px solid lightgray',
                maxWidth: '768px',
                display: 'block',
                margin: 'auto'
            }}>
                {listitems}
            </div>
        )
    }
}

export default class TeacherCoursesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coursesList: [],
            total: 0,
            progress: 0,
            loading: true,
        }
    }

    handleCourseFetch(course) {
        let newlist = this.state.coursesList;
        newlist.push(course);
        console.log("Recieved course: " + JSON.stringify(newlist));
        if (this.state.progress + 1 !== this.state.total)
            this.setState({coursesList: newlist, progress: ++this.state.progress });
        else
            this.setState({coursesList: newlist, loading: false, progress: this.state.total});
    }

    handleCoursesFeedback(list) {
        this.setState({total: list.length, progress: 0})
        list.map(feedback => {
            fbApi.getCourse(config.academicApi.course + "/" + feedback.courseId, this.handleCourseFetch.bind(this));
        })
    }

    fetchTeacherFeedbacksList() {
        window.fbApi.getCoursesFeedback(config.feedbackApi.resultsApi + "/teachers/" + this.props.params.teacherId,
            this.handleCoursesFeedback.bind(this),
            error => console.log(error)
        );
    }

    componentDidMount() {
        this.fetchTeacherFeedbacksList();
    }

    render() {
        let view = !this.state.busy ? <CoursesListGroup key="courseList" teacherId={this.props.params.teacherId} list={this.state.coursesList} /> : loader;
        return (
            <SlideInUp>
                <div className="well" style={{
                    border: 0,
                    boxShadow: '0 0.2em 0.3em lightgray',
                    borderRadius: '2px',
                    background: 'none',
                    backgroundColor: '#428bca',
                    color: 'white'
                }}>
                    <h1>Courses taught by {this.props.params.teacherId}</h1>
                </div>
                {view}
            </SlideInUp>
        )
    }
}

