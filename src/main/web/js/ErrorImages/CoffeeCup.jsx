import React from 'react';

export default class CoffeeCup extends React.Component  {
    render() {
        return (
            <div {...this.props} className="material-icons">
                local_cafe
            </div>
        )
    }
}
