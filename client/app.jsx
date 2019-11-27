import React from "react";
import ReactDOM from "react-dom";
import Chart from "chart.js";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

ReactDOM.render(<App />, document.getElementById("app"));
