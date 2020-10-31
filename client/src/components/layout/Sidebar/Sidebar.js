import React, { Fragment } from "react";

export default function Sidebar(props) {
  const bg = props.color;
  return (
    <Fragment>
      <div
        className="grid-sidebar"
        style={{ backgroundColor: bg, color: "white" }}
      >
        {props.children}
      </div>
    </Fragment>
  );
}
