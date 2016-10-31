import React from 'react';

export default class NoRoute extends React.Component  {
    render() {
        return (
            <svg {...this.props} viewBox="0 0 24 24">
                <path fill={
                    this.props.style && this.props.style.color ? this.props.style.color : 'black'
                } d="M11,10H5L3,8L5,6H11V3L12,2L13,3V4H19L21,6L19,8H13V10H19L21,12L19,14H13V20A2,2 0 0,1 15,22H9A2,2 0 0,1 11,20V10Z" />
                `\__(`,`)__/`
            </svg>
        )
    }
}
