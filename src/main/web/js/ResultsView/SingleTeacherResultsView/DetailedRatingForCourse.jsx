import React from 'react';
import SingleQuestionResponses from '../SingleQuestionResponses';

export default class DetailedRatingForCourse extends React.Component {
	renderQuestion() {
		console.log(this.props.responses);
		return this.props.responses.map((response, key) => {
			console.log(response, this.props.template);
			let val = null;
			const statement = this.props.template.questionList.find(question => {
				return response.questionId == question.questionId;
			})
			response.statement = statement.statement;
			console.log(statement);
			return (
	            <div key={key} className="well" style={{backgroundColor: 'white', borderRadius: '4px', boxShadow: 'none'}}>
	                <small style={{letterSpacing: '0.2em', fontWeight: '600'}}>{"QUESTION " + (key + 1)}</small>
	                <SingleQuestionResponses id={key} question={response} />
	            </div>
			)
		})
	}

	render() {
		const questionList = this.renderQuestion();
		return (
			<section className="list-group">
				<div className="list-group-item">
					<h1>{this.props.teacher.UserName}</h1>
				</div>
				<div className="list-group-item">
					<p>{this.props.courseId}</p>
				</div>
				{questionList}
			</section>
		)
	}
}
