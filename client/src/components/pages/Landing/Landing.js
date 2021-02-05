import React, { Fragment,useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Features from "./Features";
import Footer from "../../layout/HeaderFooters/Footer";
import Navbar from "../../layout/HeaderFooters/Navbar";
import { getUniversity } from "../../../stores/action/university";
const imgSocial = require("../../../assets/img/social.png");

const Landing = ({ isAuthenticated,getUniversity }) => {

  //   useEffect(() => {
  //   getUniversity();
    
  //  },[])
  if (isAuthenticated) {
    return <Redirect to="/Home" />;
  }


  return (
    <Fragment>
      <Navbar></Navbar>
      <section id="hero">
        <div class="container" style={{ padding: "60px" }}>
          <div class="row d-flex align-items-center">
            <div
              class=" col-lg-6 py-5 py-lg-0 order-2 order-lg-1"
              data-aos="fade-right"
            >
              <h1>Upto 70% off Text Books </h1>
              <br />
              <Link to="/store" class="btn-get-started scrollto">
                Shop Now
              </Link>
            </div>
            <div
              class="col-lg-6 order-1 order-lg-2 hero-img"
              data-aos="fade-left"
            >
              <img
                src={imgSocial}
                class="img-fluid"
                alt=""
                height="629px"
                width="540px"
              />
            </div>
          </div>
        </div>
      </section>

      <Features></Features>
      <Footer></Footer>
    </Fragment>
  );
};
Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps,{getUniversity})(Landing);
