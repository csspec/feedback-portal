import React from 'react';
import { Link } from 'react-router';

export default class CoursesRoute extends React.Component {
    render() {
        return (
            <div>
                <h1>This is courses view.</h1>
                <Link to="/teachers/courses">Instructors</Link>
            </div>
        )
    }
}