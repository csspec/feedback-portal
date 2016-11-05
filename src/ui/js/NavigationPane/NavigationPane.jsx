import React from 'react';
import SlideInLeft from '../Transitions/SlideInLeft';

export default class NavigationPane extends React.Component {
    render() {
        return (
            <SlideInLeft>
                <ul key="aside" className="nav list-group col-sm-2" style={
                    {
                        position: 'fixed',
                        height: '100vh',
                        left: 0,
                        padding: 0,
                        backgroundColor: 'lightgray'
                    }
                }>
                    {this.props.children}
                </ul>
            </SlideInLeft>
        );
    }
}
