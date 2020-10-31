import React, { Fragment } from "react";
const ContactWrapper = (props) => {
  return (
    <Fragment>
      <div className="friends-wrapper">
        <div className="heading">
          <h5>Friends</h5>
          {props.children}
        </div>
      </div>
    </Fragment>
  );
};

export default ContactWrapper;
