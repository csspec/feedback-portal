import React from 'react';

import './checkbox_style.sass';

export default class MultipleChoiceBasedQuestion extends React.Component {
    constructor(props) {
    	super(props);
    	this.state = {
    		options: props.options.map(option => {
                option.checked = false;
                return option;
            }),
    		questionId: props.questionId
    	}
    }

    onChange(event) {
    	console.log(event.target.value);
    	this.props.onChange(event.target.value);
        const options = this.state.options.map(option => {
            let opt = {};
            if (option.label === event.target.value) {
                opt.checked = true;
            } else {
                opt.checked = false;
            }
            opt.label = option.label;
            opt.value = option.value;
            return opt;
        });
        this.setState({options: options});
    }

    render() {
    	const options = this.state.options.map((option, key) => {
    		return (
	    		<div key={key}>
                    <label style={{fontWeight: 'normal', cursor: 'pointer'}}>
                        <input type="radio"
                               name={ "questionOptions-" + this.state.questionId }
                               key={ key }
                               value={ option.label }
                        />
                        <i className="material-icons">{option.checked ? "check_circle" : "radio_button_unchecked" }</i>
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
