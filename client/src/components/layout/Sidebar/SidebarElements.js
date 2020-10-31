import React, { Fragment } from "react";
const DefaultIcon = require("../../../assets/HomePage/Math.png");
const SidebarElements = (props) => {
  return (
    <Fragment>
      <div className="grid-s-element">
        <img
          className="grid-s-element-img"
          src={props.img || DefaultIcon}
          alt=""
          height="36px"
          width="36px"
        />
        <span>{props.name}</span>
      </div>
    </Fragment>
  );
};
export default SidebarElements;
