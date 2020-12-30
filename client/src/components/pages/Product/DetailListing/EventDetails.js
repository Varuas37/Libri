import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import GridWrapper from "../../../layout/GridWrapper/GridWrapper";
import Sidebar from "../../../layout/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import SidebarButton from "../../../layout/Sidebar/SidebarButton";
import SidebarElements from "../../../layout/Sidebar/SidebarElements";
import DetailedEvent from "../../../layout/ProductDetail/DetailedEvent";
import { getEvent } from "../../../../stores/action/event";
import { connect } from "react-redux";
import Spinner from "../../../layout/Spinner/Spinner";
const iconStore = require("../../../../assets/HomePage/MarketPlace.png");
const iconBook = require("../../../../assets/HomePage/BookIcon.png");
const iconEvent = require("../../../../assets/HomePage/Events.png");
function ProductDetails({ getEvent, event: { event, loading }, match }) {
  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent, match.params.id]);

  return loading && event === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <GridWrapper navItems={true} branding={false}>
        <Sidebar color="#242526">
          <h5>Event Details</h5>
          <br></br>
          <Link to="/store/create">
            <SidebarButton text=" +    Create Listing"></SidebarButton>
          </Link>
          <br></br>

          <h5>Categories</h5>
          <Link to="/books">
            <SidebarElements name="Books" img={iconBook}></SidebarElements>
          </Link>
          <Link to="/events">
            <SidebarElements name="Events" img={iconEvent}></SidebarElements>
          </Link> 
          <Link to="college-essentials">
            <SidebarElements
              name="College Essentials"
              img={iconStore}
              //   img={iconStore}
            ></SidebarElements>
          </Link>
        </Sidebar>
        <div className="product-content">
          <DetailedEvent event={event}></DetailedEvent>
        </div>
      </GridWrapper>
    </Fragment>
  );
}

ProductDetails.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
});
export default connect(mapStateToProps, { getEvent })(ProductDetails);
