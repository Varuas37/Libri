import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "./DetailedProduct.css";
import { Link } from "react-router-dom";
import DisplayImage from "../Carousel/Carousel";
import Spinner from "../Spinner/Spinner";
import Moment from "react-moment";

function DetailedProduct({ event }) {
  return event === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="blackBackground">
        <div className="detailed-Product-Wrapper">
          <div className="product-carousel-wrapper">
            <div className="product-carousel">
              <DisplayImage product={event}></DisplayImage>
            </div>
          </div>
          <div className="detailedProduct-details">
            <div className="detailedProduct-heading">
              <h3>{event.title}</h3>
              <h3> Cost: {event.price == 0 ? "Free" : `$ ${event.price}`}</h3>
              <p style={{ fontSize: "smaller", color: "gray" }}>
                Starts from{" "}
                <Moment format="YYYY/MM/DD">
                  {event.startDate} {"to"}{" "}
                </Moment>{" "}
                <Moment format="YYYY/MM/DD">{event.endDate}</Moment>
              </p>
            </div>

            <div className="detailedProduct-actions">
              {/* <div
                className="gray btn btn-primary "
                style={{
                  backgroundColor: "#3A3B3C",
                  border: "none",
                  paddingLeft: "20px",
                  paddingRight: "20px",
                }}
              >
                {" "}
                <i class="fas fa-envelope"></i> Message
              </div> */}
              <div
                className="btn btn-primary"
                style={{ backgroundColor: "#3A3B3C", border: "none" }}
              >
                <i class="fas fa-bookmark"></i>
              </div>
              <div
                className="btn btn-primary"
                style={{ backgroundColor: "#3A3B3C", border: "none" }}
              >
                <i class="fas fa-share"></i>
              </div>
            </div>
            <div className="detailedProduct-Condition">
              <p style={{ fontSize: "16px" }}>
                On Campus: <span>{event.onCampus ? "Yes" : "No"}</span>
              </p>
              <p style={{ fontSize: "16px" }}>
                Free Food: <span>{event.freeFood ? "Yes" : "No"}</span>
              </p>
            </div>

            <div className="detailedProduct-Description">
              <span style={{ fontSize: "20px" }}>Description</span>
              <p style={{ paddingTop: "5px" }}>{event.description}</p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

DetailedProduct.propTypes = {};

export default DetailedProduct;
