import React, { Fragment } from "react";

import { Link } from "react-router-dom";
import SidebarElements from "../../layout/Sidebar/SidebarElements";

const iconCreateListing = require("./Sell/Assets/createListing.png");
const iconyourListing = require("./Sell/Assets/yourlistings.png");
const iconBackIcon = require("./Sell/Assets/backicon.png");
const iconHelp = require("./Sell/Assets/help.png");
const iconBook = require("./Sell/Assets/bookicon.png");
const iconEvent = require("./Sell/Assets/Event.png");
const iconlaptop = require("./Sell/Assets/laptop.png");
const iconLibri = require("../../../assets/HomePage/LibriRounded.png");
function CreateListing(props) {
  return (
    <Fragment>
      {props.children}
      <div className="sell-item-layout">
        <div className="sell-item-s-header-mb">
          <Link to="/">
            <img src={iconBackIcon} alt="" width="35px" height="35px" />
          </Link>

          <img src={iconCreateListing} alt="" width="40px" height="40px" />
          <img src={iconyourListing} alt="" width="40px" height="40px" />
          <img src={iconHelp} alt="" width="40px" height="40px" />
        </div>
        <div className="sell-item-sidebar-container">
          <Link to="/">
            <div className="sell-item-s-header-c">
              <img src={iconLibri} alt="Libri" width="40px" height="40px" />{" "}
              Libri
            </div>
          </Link>

          <div className="sell-item-s-create">
            <SidebarElements
              name="Create Listing"
              img={iconCreateListing}
            ></SidebarElements>
          </div>
          <div className="sell-item-s-options">
            <SidebarElements
              name="Your Listings"
              img={iconyourListing}
            ></SidebarElements>
          </div>
          <div className="sell-item-s-options">
            <SidebarElements name="Help" img={iconHelp}></SidebarElements>
          </div>
        </div>
        <div className="sell-item-options-container">
          <div className="sell-item-o-c-heading">Choose Listing Type</div>
          <div className="sell-item-o-center">
            <Link to="/store/create/books">
              <div className="sell-item-o-options">
                <img src={iconBook} alt="" height="60px" width="60px" />
                <div className="sell-item-o-text">
                  <div className="sell-item-o-header">Books</div>
                  <div className="sell-item-o-subheading">
                    Sell your old books
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/store/create/events">
              <div className="sell-item-o-options">
                <div className="sell-items-o-options-container">
                  <img src={iconEvent} alt="" height="60px" width="60px" />
                  <div className="sell-item-o-text">
                    <div className="sell-item-o-header">Events</div>
                    <div className="sell-item-o-subheading">
                      Create Events or sell tickets
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <Link to="/store/create/others">
              <div className="sell-item-o-options">
                <img src={iconlaptop} alt="" height="60px" width="60px" />
                <div className="sell-item-o-text">
                  <div className="sell-item-o-header">Others</div>
                  <div className="sell-item-o-subheading">
                    Sell your used items and things you no longer need
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="sell-item-gap"></div>
      </div>
    </Fragment>
  );
}

export default CreateListing;
