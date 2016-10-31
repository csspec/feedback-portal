import React from 'react';
import CoffeeCup from './CoffeeCup';

export default class TakeSomeCoffee extends React.Component {
    render() {
        return (
            <div style={{
                background: 'none',
                color: 'gray',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <CoffeeCup style={{
                    color: 'gray',
                    display: 'block',
                    margin: 'auto',
                    fontSize: '150px',
                    opacity: '0.6'
                }} />
                {this.props.children}
            </div>
        )
    }
}
