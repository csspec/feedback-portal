import React from 'react';
import { Link } from 'react-router';
import SlideInUp from '../../Transitions/SlideInUp';
import { makeAjaxRequest } from '../../Ajax';
import config from '../../config';
import Button from '../../Button';
import Loading from '../../Loading';
import WhereIsEveryone from '../../ErrorImages/WhereIsEveryone';
import SearchBar from '../Common/SearchBar';
import SideBar from '../../NavigationPane/SideBar';
import FontIcon from 'material-ui/FontIcon';

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
);

class Course extends React.Component {
    render() {
        return (
            <div className="list-group-item btn btn-default"
                    style={{outline: 0, border: 'none', textAlign: 'left', padding: 0}}>
                    <Link to={ "/courses/" + this.props.course.courseId } className="row">
                        <div className="col-xs-2 col-sm-2" style={{display: 'flex', alignItems: 'center'}}>
                            <span className="material-icons" style={{fontSize: '50px'}}>account_circle</span>
                        </div>
                        <div className="col-xs-6 col-sm-6">
                            <strong style={{display: 'block'}}>{this.props.course.name}</strong>
                            <small style={{display: 'block', color: 'gray'}}>{this.props.course.offeredBy}</small>
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
                <Course course={course} key={course.courseId} /> 
            );
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
        );
    }
}

export default class CoursesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseList: [],
            loading: true,
        };
    }

    fetchCourses() {
        fbApi.getAllCourses(list => {
            this.setState((prevState, props) => ({courseList: list, loading: false}));
        }, console.log);
    }

    componentDidMount() {
        this.fetchCourses();
    }

    handleSearch(keyword) {
        console.log(keyword);
    }

    render() {
        let view = !this.state.loading ? <CoursesListGroup list={this.state.courseList} /> : loader;
        return (
            <div className="row"  style={{margin: 0}}>
                <div className="sidebar col-sm-2" style={{margin: 0}}>
                    <SideBar />
                </div>
                <div className="rest col-sm-10" style={{margin: 0, padding: 0}}>
                    <nav className="navbar navbar-default" style={{
                        border: 0,
                        display: 'flex',
                        borderRadius: '2px',
                    }}>
                        <div className="row" style={{
                            maxWidth: '768px',
                            display: 'flex',
                            margin: 'auto',
                            width: '100%',
                            alignItems: 'center'
                        }}>
                            <div className="col-sm-2 col-xs-2">
                                <Link to="/">
                                    <FontIcon className="material-icons">arrow_back</FontIcon>
                                </Link>
                            </div>
                            <div className="col-sm-10 col-xs-10">
                                <h4>Select a course to view its detailed results</h4>
                            </div>
                        </div>
                    </nav>
                    <SlideInUp>
                        <SearchBar onSearch={this.handleSearch.bind(this)}
                            style={{
                                maxWidth: '768px',
                                display: 'block',
                                margin: 'auto'
                            }}/>
                        {view}
                    </SlideInUp>
                </div>
            </div>
        );
    }
}

