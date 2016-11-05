import React from 'react';
import { Link } from 'react-router';

export default class TeachersRoute extends React.Component {
    render() {
        return (
            <div>
                <h1>This is teachers view.</h1>
                <Link to="/courses/teacherid">Courses</Link>
            </div>
        )
    }
}
