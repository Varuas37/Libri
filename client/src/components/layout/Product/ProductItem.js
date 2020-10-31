import React, { Fragment } from "react";

const ProductItem = ({ product }) => {
  return (
    <Fragment>
      <div className="product-item">
        <div className="product-img">
          {" "}
          <img
            className="product-img-i"
            src={product.images[0].url}
            alt=""
            height="100%"
            width="100%"
          />
        </div>
        <div className="product-details">
          <div className="product-price">{product.price}</div>
          <div className="product-title">{product.title}</div>
          <div className="product-seller-name">Listed by: {product.name}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductItem;
