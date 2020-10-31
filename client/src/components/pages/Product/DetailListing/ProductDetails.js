import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import GridWrapper from "../../../layout/GridWrapper/GridWrapper";
import Sidebar from "../../../layout/Sidebar/Sidebar";
import { Link } from "react-router-dom";
import SidebarButton from "../../../layout/Sidebar/SidebarButton";
import SidebarElements from "../../../layout/Sidebar/SidebarElements";
import DetailedProduct from "../../../layout/ProductDetail/DetailedProduct";
import { getProduct } from "../../../../stores/action/product";
import { connect } from "react-redux";
import Spinner from "../../../layout/Spinner/Spinner";
const iconStore = require("../../../../assets/HomePage/MarketPlace.png");
const iconBook = require("../../../../assets/HomePage/BookIcon.png");
const iconEvent = require("../../../../assets/HomePage/Events.png");
function ProductDetails({ getProduct, product: { product, loading }, match }) {
  useEffect(() => {
    getProduct(match.params.id);
  }, [getProduct, match.params.id]);

  return loading && product === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <GridWrapper navItems={true} branding={false}>
        <Sidebar color="#242526">
          <h5>Product Details</h5>
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
          <DetailedProduct product={product}></DetailedProduct>
        </div>
      </GridWrapper>
    </Fragment>
  );
}

ProductDetails.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});
export default connect(mapStateToProps, { getProduct })(ProductDetails);
