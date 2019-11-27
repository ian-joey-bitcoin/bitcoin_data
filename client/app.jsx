import React from "react";
import ReactDOM from "react-dom";
import Chart from "chart.js";

import axios from "axios";
import moment from "moment";
import Form from "Form.jsx";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateArray: [],
      valueArray: []
    };
    this.chartRef = React.createRef();
    this.getNewData = this.getNewData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.chartRef = React.createRef();
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

  //handle date change
  handleChange(e) {
    const target = e.target;
    console.log({ target });
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    return (
      <div>
        <Form
          startDate={this.state.startDate}
          //endDate={this.state.endDate}
          handleChange={this.handleChange}
        />
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
