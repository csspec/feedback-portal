import React from 'react';
import { Link } from 'react-router';
import SlideInUp from '../../Transitions/SlideInUp';
import { makeAjaxRequest } from '../../Ajax';
import config from '../../config';
import Button from '../../Button';
import Loading from '../../Loading';
import WhereIsEveryone from '../../ErrorImages/WhereIsEveryone';

const loader = (
    <div key="loader" style={{
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

class Course extends React.Component {
    render() {
        return (
            <Button className="list-group-item"
                    style={{outline: 0, border: 'none', padding: '1em'}}>
                    <Link to={ "/courses/" + this.props.course.courseId } className="row">
                        <div className="col-xs-2 col-sm-2" style={{display: 'flex', alignItems: 'center'}}>
                            <span className="material-icons" style={{fontSize: '50px'}}>account_circle</span>
                        </div>
                        <div className="col-xs-6 col-sm-6">
                            <strong style={{display: 'block'}}>{this.props.course.courseName}</strong>
                            <small style={{display: 'block', color: 'gray'}}>{this.props.course.departmentId}</small>
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
                <Course course={course} key={course.courseId} /> 
            )
        });

        if (listitems.length < 1) {
            // Oops! there was no teacher in this college.
            listitems = (
                <WhereIsEveryone>
                    Where is everyone?
                </WhereIsEveryone>
            );
        }

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

export default class CoursesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            loading: true,
        }
    }

    fetchCourses() {
        fbApi.getAllCourses(list => {
            this.setState((prevState, props) => ({courseList: list, loading: false}));
        }, console.log)
    }

    componentDidMount() {
        this.fetchCourses();
    }

    render() {
        let view = !this.state.loading ? <CoursesListGroup list={this.state.courseList} /> : loader;
        return (
            <div>
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
                        <h4>Select a course to view its detailed results</h4>
                    </div>
                </nav>
                <SlideInUp>
                    <SearchBar onSearch={this.handleSearch.bind(this)} />
                    {view}
                </SlideInUp>
            </div>
        )
    }
}

