import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const DefaultIcon = require("../../../assets/HomePage/Math.png");
const SidebarElements = ({link,name,img}) => {
  return (
    <Link to ={link}>
      <div className="grid-s-element">
        <img
          className="grid-s-element-img"
          src={img || DefaultIcon}
          alt=""
          height="36px"
          width="36px"
        />
        <span>{name}</span>
      </div>
    </Link>
  );
};
export default SidebarElements;
