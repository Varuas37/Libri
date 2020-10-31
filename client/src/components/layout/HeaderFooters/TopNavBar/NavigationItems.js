import React, { Fragment } from "react";
import { Link } from "react-router-dom";
const iconHome = require("../../../../assets/HomePage/HomeLight.png");
const iconBook = require("../../../../assets/HomePage/Book.png");
const iconStore = require("../../../../assets/HomePage/Store.png");
const iconGroups = require("../../../../assets/HomePage/Groups.png");

export default function NavigationItems() {
  return (
    <Fragment>
      <div className="grid-navigation-items">
        <div className="navigation-wrapper">
          <Link to="/" className="nav-icons" href="!#">
            <img src={iconHome} alt="Home Icon" height="40px" width="40px" />
          </Link>

          <Link to="/books" className="nav-icons" href="!#">
            <img src={iconBook} alt="Book Icon" height="40px" width="40px" />
          </Link>
          <Link to="/store" className="nav-icons" href="!#">
            <img src={iconStore} alt="Store Icon" height="40px" width="40px" />
          </Link>
          <Link to="/groups" className="nav-icons" href="!#">
            <img
              src={iconGroups}
              alt="Groups Icon"
              height="40px"
              width="40px"
            />
          </Link>
        </div>
      </div>
    </Fragment>
  );
}
