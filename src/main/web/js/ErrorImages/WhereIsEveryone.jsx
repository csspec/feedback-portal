import React from 'react';
import NoRoute from './NoRoute';


export default class WhereIsEveryone extends React.Component {
    render() {
        return (
            <div style={{
                background: 'none',
                color: 'gray',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <div style={{
                    color: 'gray',
                    display: 'block',
                    margin: 'auto',
                    fontSize: '150px',
                    padding: '30px'
                }} className="material-icons">
                    face
                </div>
                {this.props.children}
            </div>
        )
    }
}
