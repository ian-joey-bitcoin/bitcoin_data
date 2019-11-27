import React from "react";
import ReactDOM from "react-dom";
import Chart from "chart.js";
import Form from "./Form.jsx";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      //endDate: "",
      labels: [],
      datasets: []
    };
    this.chartRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
            label: "Prices",
            data: [86, 67, 91]
          }
        ]
      },
      options: {
        //Customize chart options
      }
    });
  }

  //handle date change
  handleChange(e) {
    const target = e.target;
    console.log({target})
    this.setState({
      [target.name]: target.value
    })
  };



  render() {
    let string = "<div>hi</div>";

    return (
      <div>
        <Form 
          startDate={this.state.startDate}
          //endDate={this.state.endDate}
          handleChange={this.handleChange}/>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
