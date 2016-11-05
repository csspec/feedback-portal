import React from 'react';
import PaperRipple from '../Transitions/ripple';

export default class Button extends React.Component {

	constructor(props) {
		super(props);
		this.ripple = new PaperRipple();
	}

	componentDidMount() {
		this.button.appendChild(this.ripple.$);
	}

	handleMouseDown(event) {
	}

	handleMouseUp(event) {
	}

	componentDidUpdate() {
	}

	render() {
		return (
			<button ref={comp => this.button = comp}
				className={this.props.className + " btn btn-primary"} {...this.props} onClick={this.props.onClick}
				onMouseDown={this.handleMouseDown.bind(this)}
				onTouchStart={this.handleMouseDown.bind(this)}
				onMouseUp={this.handleMouseUp.bind(this)}
				onTouchEnd={this.handleMouseUp.bind(this)}
				onTouchMove={this.handleMouseUp.bind(this)}
				onTouchCancel={this.handleMouseUp.bind(this)}>

				{this.props.children}
			</button>
		)
	}
}
