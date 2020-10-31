import React, { Fragment } from "react";

export default function ContentWrapper(props) {
  return (
    <Fragment>
      <div className="grid-content">
        <div className="grid-content-wrapper">{props.children}</div>
      </div>
    </Fragment>
  );
}
