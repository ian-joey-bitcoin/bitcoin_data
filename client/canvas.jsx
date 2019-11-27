import React from "react";
import Chart from "chart.js";
// import classes from "./LineGraph.module.css";
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feeds: []
    };
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        labels: ["Jan", "Feb", "March", "newthing"],
        datasets: [
          {
            label: "Sales",
            data: [86, 67, 91]
          }
        ]
      },
      options: {
        //Customize chart options
      }
    });
  }
  render() {
    let string = "<div>hi</div>";

    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

export default Canvas;
