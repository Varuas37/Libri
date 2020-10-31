import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../../layout/Spinner/Spinner";
import { getProducts } from "../../../stores/action/product";
import { getEvents } from "../../../stores/action/event";
import GridWrapper from "../../layout/GridWrapper/GridWrapper";
import Sidebar from "../../layout/Sidebar/Sidebar";
import SidebarElements from "../../layout/Sidebar/SidebarElements";
import Searchbar from "../../layout/Searchbox/Searchbar";
import SidebarButton from "../../layout/Sidebar/SidebarButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProductWrapper from "../../layout/Product/ProductWrapper";
import ProductItem from "../../layout/Product/ProductItem";
import ProductFilter from "../../layout/Product/Filters/ProductFilter";

const iconStore = require("../../../assets/HomePage/MarketPlace.png");
const iconBook = require("../../../assets/HomePage/BookIcon.png");
const iconEvent = require("../../../assets/HomePage/Events.png");
const iconCollege = require("../../../assets/HomePage/Courses.png");
const iconUser = require("./Sell/Assets/SingleUser.png");
const ProductMarket = ({
  product: { loading, products },

  getProducts,
}) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const handleChange = (category) => {
    setActiveCategory(category);
    if (category == "All") {
      return setFilteredProduct(products);
    } else {
      setFilteredProduct(
        products.filter((product) => {
          return product.condition
            .toLocaleLowerCase()
            .includes(category.toLocaleLowerCase());
        })
      );
    }
  };
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProduct] = useState("");
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    setFilteredProduct(
      products.filter((product) => {
        return product.title
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase());
      })
    );
  }, [search, products]);

  return loading && products === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <GridWrapper navItems={true} branding={false}>
        <Sidebar color="#242526">
          <h5>College Essentials</h5>
          <br></br>
          <input
            className="searchbar"
            placeholder="Search College Essentials"
            onChange={(e) => setSearch(e.target.value)}
          />
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
            ></SidebarElements>
          </Link>
        </Sidebar>
        <div className="product-content">
          <div className="mb-productStore-header">
            <div className="productStore-header-options">
              <div className="s-h-user">My Account</div>
              <Link to="/store/create">
                <div className="s-h-sell">Sell</div>
              </Link>
              {/* <div className="s-h-categories">All Categories</div> */}
            </div>
            <Searchbar text="Search Store"></Searchbar>
          </div>
          <ProductFilter onChange={handleChange}></ProductFilter>
          <div className=" first store-product-category ">
            <h5>College Essentials </h5>
          </div>
          <ProductWrapper>
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts
                .filter((product) => product.category == "collegeEssential")
                .map((product) => (
                  <Link to={`/college-essentials/${product._id}`}>
                    <ProductItem key={product._id} product={product} />
                  </Link>
                ))
            ) : (
              <p>"{search}" not found</p>
            )}
          </ProductWrapper>

          <br></br>
        </div>
      </GridWrapper>
    </Fragment>
  );
};
ProductMarket.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProducts })(ProductMarket);
