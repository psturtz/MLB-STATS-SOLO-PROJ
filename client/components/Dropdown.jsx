import React from "react"

const Dropdown = (props) => {
  return (
    <div className="col-span-2 mx-auto">
      <select name="selectList" id="selectList">
        <option selected value="0">Click to see options</option>
        <option value="option 1">Option 1</option>
        <option value="option 2">Option 2</option>
      </select>
    </div>
  );
};

export default Dropdown;
