import React from 'react';
import Chart from 'chart.js';

export default class ReactPieChart extends React.Component {
    componentDidMount() {
        let ctx = this.refs.canvas.getContext('2d');
        let PieChart = new Chart(ctx, {
            type: this.props.type,
            data: {
                labels: this.props.dataLabels,
                datasets: [{
                    data: this.props.data,
                    backgroundColor: this.props.backgroundColors,
                    borderColor: this.props.borderColors,
                    borderWidth: this.props.borderWidth
                }]
            },
            options: {
                legend: {
                    display: this.props.showLegends
                }
            }
        });
    }

    render() {
        return (
            <canvas ref="canvas" width={300} height={300} />
        )
    }
}

ReactPieChart.propTypes = {
    data: React.PropTypes.array.isRequired,
    type: React.PropTypes.string,
    showLegends: React.PropTypes.bool,
    backgroundColor: React.PropTypes.array,
    borderColor: React.PropTypes.array,
    borderWidth: React.PropTypes.number
}

ReactPieChart.defaultProps = {
    dataLabels:  [ '5', '4', '3', '2', '1' ],
    type: 'pie',
    showLegends: false,
    backgroundColors:  [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
    borderColors: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
}
