import React from "react";
import ReactDOM from "react-dom";
import Chart from "chart.js";
import axios from "axios";
import moment from "moment";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateArray: [],
      valueArray: []
    };
    this.chartRef = React.createRef();
    this.getNewData = this.getNewData.bind(this);
  }
  getNewData(startDate, endDate) {
    return axios
      .get("/bitcoin", { params: { startDate: startDate, endDate: endDate } })
      .then(({ data }) => {
        let dateArray = [];
        let valueArray = [];
        for (let obj in data.bpi) {
          dateArray.push(obj);
          valueArray.push(data.bpi[obj]);
        }
        console.log("dataArray", dateArray);
        console.log("valueArray", valueArray);
        this.setState({ dateArray: dateArray, valueArray: valueArray });
        console.log("STATE", this.state);
        return null;
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentDidMount() {
    this.getNewData("2013-09-01", "2013-09-05").then(() => {
      console.log("comp did mount", this.state);
      const myChartRef = this.chartRef.current.getContext("2d");
      new Chart(myChartRef, {
        type: "line",
        data: {
          //Bring in data
          labels: this.state.dateArray,
          datasets: [
            {
              label: "Bitcoin Price",
              data: this.state.valueArray
            }
          ]
        },
        options: {}
      });
    });
  }
  render() {
    return (
      <div>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
