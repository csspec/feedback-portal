import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';
import './slideInLeft.sass';

export default class SlideInLeft extends React.Component {
	render() {
		return (
			<ReactCSSTransitionGroup transitionName="slideInLeft"
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
