import React, { Fragment } from "react";
const CoursesWrapper = (props) => {
  return (
    <Fragment>
      <div className="courses-wrapper">{props.children}</div>
    </Fragment>
  );
};

export default CoursesWrapper;
