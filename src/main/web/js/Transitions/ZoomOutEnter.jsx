import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';
import './zoomOutEnter.sass';

export default class ZoomOutEnter extends React.Component {
	render() {
		return (
			<ReactCSSTransitionGroup transitionName="zoomOutEnter"
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
