import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import ResultsView from './ResultsView';
import TeachersList from './ResultsView/TeachersRoute/TeachersList';
import CourseTeachersList from './ResultsView/CoursesRoute/CourseTeachersList';
import CoursesList from './ResultsView/CoursesRoute/CoursesList';
import TeacherFeedbackResult from './ResultsView/TeachersRoute/TeacherFeedbackResult';
import CourseFeedbackResult from './ResultsView/CoursesRoute/CourseFeedbackResult';
import injectStore from './Utils/Store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TeacherCoursesList from './ResultsView/TeachersRoute/TeacherCoursesList';
import StudentFilter from './ResultsView/StudentsStatusRoute/StudentFilter';
import '../sass/common.sass';

injectStore();
injectTapEventPlugin();

class App extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
                <Router history={hashHistory}>
                    <Route path="/" component={ResultsView} />
                    <Route path="/teachers" component={TeachersList} />
                    <Route path="/courses" component={CoursesList} />
                    <Route path="/teachers/:teacherId" component={TeacherCoursesList} />
                    <Route path="/courses/:courseId" component={CourseTeachersList} />
                    <Route path="/teachers/:teacherId/:courseId" component={TeacherFeedbackResult} />
                    <Route path="/courses/:courseId/:teacherId" component={CourseFeedbackResult} />
                    <Route path="/status" component={StudentFilter} />
                </Router>
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('react-mount-point'));
