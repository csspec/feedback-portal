import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import ResultsView from './ResultsView';
import TeachersRoute from './ResultsView/TeachersRoute';
import TeachersList from './ResultsView/TeachersRoute/TeachersList';
import CoursesRoute from './ResultsView/CoursesRoute';
import TeacherFeedbackResult from './ResultsView/TeachersRoute/TeacherFeedbackResult';
import injectStore from './Utils/Store';
import TeacherCoursesList from './ResultsView/TeachersRoute/TeacherCoursesList';
import '../sass/common.sass';

injectStore();

class App extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={ResultsView} />
                <Route path="/teachers" component={TeachersList} />
                <Route path="/courses" component={CoursesRoute} />
                <Route path="/teachers/:teacherId" component={TeacherCoursesList} />
                <Route path="/courses/:courseId" component={CoursesRoute} />
                <Route path="/teachers/:teacherId/:courseId" component={TeacherFeedbackResult} />
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('react-mount-point'));
