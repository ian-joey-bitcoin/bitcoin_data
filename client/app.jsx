import React from "react";
import ReactDOM from "react-dom";
import Chart from "chart.js";

import axios from "axios";
import moment from "moment";
import Form from "./Form.jsx";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      dateArray: [],
      valueArray: []
    };
    this.chartRef = React.createRef();
    this.getNewData = this.getNewData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.chartRef = React.createRef();
  }
  handleSubmit() {
    axios
      .get("/bitcoin", { params: { startDate: this.state.startDate } })
      .then(({ data }) => {
        console.log("click", this.state.startDate);
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
      })
      // .then(()=>{this.getNewData(this.state.startDate,this.state.endDate)
      // })
      .catch(err => {
        console.log(err);
      });
  }

  getNewData(startDate,endDate) {
    
    return axios
      .get("/bitcoin", { params: { startDate: startDate, endDate: endDate} })
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
    this.getNewData("2019-11-01", "2019-11-26").then(() => {
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
    const startDate = e.target.value;
    const year = parseInt(startDate.slice(0,4));
    const month = parseInt(startDate.slice(5,7));
    let limit;
    if ([4,6,9,11].includes(month)){
      limit = 30;
    } else if([1,3,5,7,8,10,12].includes(month)){
      limit = 31;
    } else {
      if(year % 4 === 0){
        limit = 29;
      } else {
        limit = 28;
      }
    }
    const endDate = `${startDate.slice(0,8)}${limit}`;
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
  
    
  }

  render() {
    return (
      <div>
        <Form
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
