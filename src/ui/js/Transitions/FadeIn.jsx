import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React from 'react';
import './fadein.sass';

export default class FadeIn extends React.Component {
	render() {
		return (
			<ReactCSSTransitionGroup transitionName="fadeIn"
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
