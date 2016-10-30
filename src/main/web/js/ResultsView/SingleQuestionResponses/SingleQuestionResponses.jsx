import React, { Component } from 'react';
import ReactPieChart from '../ReactPieChart';

					// <table className="table table-hover" style={{width: '10em', marginLeft: '3em'}}>
					// 	<tbody>
					// 		{
					// 			optionDetails.map((option, key) => {
					// 				return (
					// 					<tr className="row">
					// 						<td>{option[0]}</td>
					// 						<td>{option[1]}</td>
					// 					</tr>
					// 				)
					// 			})
					// 		}
					// 	</tbody>
					// </table>

export default class SingleQuestionResponses extends Component {
	render() {
		let optionDetails = [];
		for (const prop in this.props.question.details) {
			optionDetails.push(new Array(prop, this.props.question.details[prop]));
		}
		return (
			<div>
				<div className="row">
					<div className="col-xs-12">
						<h3>{this.props.question.statement}</h3>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-6">
						<ReactPieChart id={this.props.id} details={this.props.question.details} />
					</div>
					<div className="col-xs-6" style={{height: '13em', display: 'flex', alignItems: 'center'}}>
						<h1 style={{fontSize: '5em', display:'block', margin: 'auto', color: "#636363",fontWeight: 900, verticalAlign: 'middle'}}>{this.props.question.average}</h1>
					</div>
				</div>
			</div>
		)
	}
}
