import React from 'react';
// import Chart from 'chart.js';

export default class ReactPieChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            details: props.details
        }
    }

    drawChart() {
        let data = new google.visualization.DataTable();
        data.addColumn('string', 'Option');
        data.addColumn('number', 'Value');

        let options = [];
        for (const prop in this.props.details) {
            options.push(new Array(prop, this.props.details[prop]))
        }

        options.sort((first, second) => {
            return first[0] < second[0];
        })

        data.addRows(options);

        console.log("Drawing Google Chart");
        const chartOptions = {
            animation: {
                startup: true,
                duration: 200,
                easing: 'in'
            },
            fontSize: 14,
            legend: {position: 'right', textStyle: {fontSize: 16}}
        };

        // Instantiate and draw our chart, passing in some options.
        const chart = new google.visualization.PieChart(document.getElementById("gCharts" + this.props.id));
        chart.draw(data, chartOptions);
    }

    componentDidMount() {
        if (typeof google === 'undefined' || typeof google.charts === 'undefined') {
            console.log("Unable to load google charts library");
            return;
        }
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(this.drawChart.bind(this));
    }

    render() {
        return (
            <div className="gCharts" id={"gCharts" + this.props.id} />
        )
    }
}
