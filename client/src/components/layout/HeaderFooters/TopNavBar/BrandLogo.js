import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const LibriIcon = require("../../../../assets/HomePage/Libri1.png");
const BrandLogo = () => {
  return (
    <Fragment>
      <div className="brand-logo">
        <div className="brand-logo-wrapper">
          <Link to="/">
            <img
              className="LibriIcon"
              src={LibriIcon}
              alt=""
              height="40px"
              width="40px"
            />
          </Link>

          <input className="searchbox" placeholder="Search Libri" />
        </div>

        <div className="sm-brand-logo">
          <Link to="/">
            <img
              className="LibriIcon"
              src={LibriIcon}
              alt=""
              height="40px"
              width="40px"
            />
          </Link>

          <div className="sm-searchbox">
            <i className="fas fa-search" />
          </div>
          <div className="sm-options">
            <i className="fas fa-align-justify" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default BrandLogo;
