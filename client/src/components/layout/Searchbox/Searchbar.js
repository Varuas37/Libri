import React, { Fragment } from "react";

const Searchbar = (props) => {
  return (
    <Fragment>
      <input className="searchbar" placeholder={props.text} />
      <div className="sm-searchbar">
        <i className="sm fas fa-search" />
      </div>
    </Fragment>
  );
};

export default Searchbar;
