import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../../../../stores/action/product";

// CSS
require("../Filters/ProductFilter.css");
function ProductFilter({ onChange, product: { products } }) {
  const productCategory = ["All"];

  products.map((product) => {
    if (!productCategory.includes(product.condition)) {
      productCategory.push(product.condition);
      productCategory.sort();
    }
  });
  const handleChange = (condition) => {
    onChange(condition);
  };
  return (
    <Fragment>
      <div className="category-filter_wrapper">
        <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>
          Shop by Condition
        </p>
        <div className="category-item">
          {productCategory.map((condition) => (
            <div
              key={condition}
              className="c-item"
              onClick={() => handleChange(condition)}
            >
              {condition}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

ProductFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { getProducts })(ProductFilter);
