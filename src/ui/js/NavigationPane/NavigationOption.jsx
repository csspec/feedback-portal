import React from 'react';
import {Link} from 'react-router';

export default class NavigationOption extends React.Component {
    render() {
        return (
            <Link to={this.props.for} className="list-group-item" style={ this.props.nostyle ? {} :{
                outline: 0,
                border: 0,
                display: 'flex',
                alignItems: 'center'
            }}>
                {this.props.children}
            </Link>
        );
    }
}
