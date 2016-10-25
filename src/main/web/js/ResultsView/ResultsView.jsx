import React from 'react';
import Chart from 'chart.js';
import SingleTeacherResultsView from './SingleTeacherResultsView';
import MainResultsPage from './MainResultsPage';
import { Router, Route, hashHistory } from 'react-router';
import TeacherResultsView from './TeacherResultsView';
import ReactDOM from 'react-dom';

const details = {
    chart_data: [210, 123, 45, 2, 4],
    average_rating: ([210, 123, 45, 2, 4].reduce((sum, element, index) => element * (4 - index) + sum) / 384).toFixed(1),
    total_number_of_students: [210, 123, 45, 2, 4].reduce((sum, element) => element + sum),
    instructor_name: "Pushpinder Singh"
}

function Default() {
    return (
        <p>Hello, World</p>
    )
}

export default class ResultsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }


    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={MainResultsPage} />
                <Route path="/teachers" component={TeacherResultsView} />
                <Route path="/teachers/:teacher_id" component={SingleTeacherResultsView} />
                <Route path="/courses" component={Default} />
                <Route path="/courses/:course_id" component={Default} />
            </Router>
        )
    }
}

ReactDOM.render(<ResultsView />, document.getElementById('results-view'));
