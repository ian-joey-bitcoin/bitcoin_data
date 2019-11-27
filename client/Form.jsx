import React from "react";

export default function Form(props) {
  return (
    <div>
      <label>
        start from :
        <input type="date" name="startDate" onChange={props.handleChange} />
      </label>
      <button onClick={props.handleSubmit}>Show Closing Prices</button>
    </div>
  );
}
