import React from 'react';
import { Link } from 'react-router';


export default class ResultsView extends React.Component {
    render() {
        return (
            <ul>
                <li><Link to="/courses">Courses</Link></li>
                <li><Link to="/teachers">Teachers</Link></li>
            </ul>
        )
    }
}
