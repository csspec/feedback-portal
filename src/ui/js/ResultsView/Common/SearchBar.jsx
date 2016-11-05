import React from 'react';

export default class SearchBar extends React.Component {

    handleSubmit(event) {
        event.preventDefault();
        return false;
    }

    handleChange(event) {
        let text = event.target.value;
        this.props.onSearch(text);
    }

    render() {
        return (
            <form style={this.props.style} className="form-group" onSubmit={this.handleSubmit.bind(this)}>
                <input style={{
                    outline: 0,
                    border: 0,
                    padding: '1em 0.5em',
                    fontSize: '18px'
                }} type="text" placeholder="Search..." onChange={this.handleChange.bind(this)} />
            </form>
        );
    }
}