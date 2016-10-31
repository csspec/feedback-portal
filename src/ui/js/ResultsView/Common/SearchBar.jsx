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
            <form onSubmit={this.handleSubmit.bind(this)}>
                <input type="text" placeholder="Search..." onChange={this.handleChange.bind(this)} />
            </form>
        );
    }
}