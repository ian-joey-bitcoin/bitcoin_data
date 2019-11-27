import React from "react";
import ReactDOM from "react-dom";
import Canvas from "./canvas.jsx";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Canvas />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
