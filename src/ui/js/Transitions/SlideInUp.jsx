import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';
import './slideInUp.sass';


export default class SlideInUp extends React.Component {
    render() {
        return (
            <ReactCSSTransitionGroup transitionName="slideInUp"
                        transitionAppear={true}
                        transitionAppearTimeout={500}
                        transitionEnterTimeout={500}
                        transitionLeave={true}
                        transitionLeaveTimeout={500}>
                    {this.props.children}
            </ReactCSSTransitionGroup>  
        )
    }
}
