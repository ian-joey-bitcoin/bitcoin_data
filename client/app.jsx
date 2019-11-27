import React from "react";
import ReactDOM from "react-dom";
import Chart from "chart.js";
import axios from "axios";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
    this.chartRef = React.createRef();
  }
  getNewData(startDate, endDate) {
    axios
      .get("/bitcoin", { params: { startDate: startDate, endDate: endDate } })
      .then(({ data }) => {
        console.log(data);
        this.setState({ data: data });
      });
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
      options: {}
    });
  }
  render() {
    console.log("RENDER", this.chartRef);
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
