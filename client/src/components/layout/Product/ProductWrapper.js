import React, { Fragment } from "react";

import "./Product.css";
function ProductWrapper(props) {
  return (
    <Fragment>
      <div className="product-wrapper">{props.children}</div>
    </Fragment>
  );
}

export default ProductWrapper;
