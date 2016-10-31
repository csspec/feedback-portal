import React from 'react';
import NoRoute from './NoRoute';


export default class NothingFound extends React.Component {
    render() {
        return (
            <div style={{
                background: 'none',
                color: 'gray',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <NoRoute style={{
                    color: 'gray',
                    display: 'block',
                    margin: 'auto',
                    maxWidth: '150px'
                }} />
                {this.props.children}
            </div>
        )
    }
}
