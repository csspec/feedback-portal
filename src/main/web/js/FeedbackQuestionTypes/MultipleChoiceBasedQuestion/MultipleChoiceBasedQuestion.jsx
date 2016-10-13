import React from 'react';

import './checkbox_style.sass';

export default class MultipleChoiceBasedQuestion extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		options: props.options,
    		questionId: props.questionId
    	}
    }

    onChange(event) {
    	console.log(event.target.value);
    	this.props.onChange(event.target.value);
    }

    render() {
    	const options = this.state.options.map((option, key) => {
    		return (
	    		<div className="radio input-group" key={key}>
	    			<label>
                        <input type="radio"
                               name={ "questionOptions-" + this.state.questionId }
                               key={ key }
                               value={ option.label }
                        />
					    {option.value}
				    </label>
				</div>
    		)
    	})

        return (
        	<div className="multiple-choice"
        			onChange={this.onChange.bind(this)}>
        		{options}
        	</div>
        )
    }
}
