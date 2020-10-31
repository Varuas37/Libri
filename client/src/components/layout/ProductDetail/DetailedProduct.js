import React, { Fragment } from "react";
import PropTypes from "prop-types";

import "./DetailedProduct.css";
import { Link } from "react-router-dom";
import DisplayImage from "../Carousel/Carousel";
import Spinner from "../Spinner/Spinner";
function DetailedProduct({ product }) {
  return product === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="blackBackground">
        <div className="detailed-Product-Wrapper">
          <div className="product-carousel-wrapper">
            <div className="product-carousel">
              <DisplayImage product={product}></DisplayImage>
            </div>
          </div>
          <div className="detailedProduct-details">
            <div className="detailedProduct-heading">
              <h3>{product.title}</h3>
              <h3>$ {product.price}</h3>
              <p style={{ fontSize: "smaller", color: "gray" }}>
                Listed at {product.createdAt}
              </p>
            </div>

            <div className="detailedProduct-actions">
              <div
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
              </div>
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
              <p style={{ fontSize: "20px" }}>
                Condition: <span>{product.condition}</span>
              </p>
            </div>
            <div className="detailedProduct-Description">
              <span style={{ fontSize: "20px" }}>Description</span>
              <p style={{ paddingTop: "5px" }}>{product.description}</p>
            </div>
            <div
              className="btn btn-primary"
              style={{
                width: "fit-content",
                marginTop: "20px",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
            >
              <Link to={`/user/${product.name}`}>Visit Seller's Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

DetailedProduct.propTypes = {};

export default DetailedProduct;
