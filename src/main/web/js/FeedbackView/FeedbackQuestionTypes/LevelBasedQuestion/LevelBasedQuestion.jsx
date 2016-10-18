import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class LevelBasedQuestion extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 0
		}
	}

	onStarClick(nextValue, prevValue, name) {
		this.setState({rating: nextValue});
		this.props.onStarClick(nextValue);
	}

	render() {
		const { rating } = this.state;
		return (
			<StarRatingComponent 
                    name="rate1"
                    starColor="#428bca"
                    starCount={this.props.level}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
            />
		)
	}
}