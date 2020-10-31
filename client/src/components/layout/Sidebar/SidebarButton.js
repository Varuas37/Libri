import React, { Fragment } from "react";

const SidebarButton = (props) => {
  return (
    <Fragment>
      <div className="sidebarButton">
        <span>{props.text}</span>
      </div>
    </Fragment>
  );
};
export default SidebarButton;
