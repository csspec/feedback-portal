import React from 'react';
import './style.sass';

export default class Loading extends React.Component {
    render() {
        return (
                <svg className="spinner" style={{display: 'block', margin: 'auto', height: this.props.height}} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" fill="none" strokeWidth="3" cx="33" cy="33" r="30"></circle>
                </svg>
        );
    }
}
