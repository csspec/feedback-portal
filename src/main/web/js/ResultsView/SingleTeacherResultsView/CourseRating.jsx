import React from 'react';

export default class CourseRating extends React.Component {
	handleClick() {
		this.props.onClick(this.props.courseId);
	}
	render() {
		return (
			<div className="list-group-item" onClick={this.handleClick.bind(this)}>
				{this.props.courseId}
			</div>
		)
	}
}
