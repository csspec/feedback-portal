import React from 'react';

export default class TextBasedQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            value: "",
        }
    }
    onChange(event) {
        this.setState({value: event.target.value});
        this.props.onComplete(event.target.value);
    }

    onBlur(event) {
      this.props.onComplete(event.target.value);
    }

    onFocus(event) {

    }

    render() {
        return (
            <div className="input-group" style={{width: '100%'}}>
                <input type="text"
                       className="form-control"
                       placeholder="Enter your response here"
                       value={this.state.value}
                       onChange={this.props.onChange ? this.props.onChange : this.onChange.bind(this)}
                       onBlur={this.props.onBlur ? this.props.onBlur : this.onBlur.bind(this)}
                       onFocus={this.props.onFocus ? this.props.onFocus : this.onFocus.bind(this)}
                />
            </div>
        )
    }
}
