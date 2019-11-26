import React from "react";
import chart from "chart.js";
import ReactDOM from "react-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>Hello World! I'm a react component</div>;
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
