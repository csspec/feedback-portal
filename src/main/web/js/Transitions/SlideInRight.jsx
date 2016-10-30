import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';
import './slideInRight.sass';

export default class SlideInRight extends React.Component {
	render() {
		return (
			<ReactCSSTransitionGroup transitionName="slideInRight"
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
