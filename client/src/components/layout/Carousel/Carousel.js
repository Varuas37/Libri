import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel.css";
const DisplayImage = ({ product }) => (
  <Carousel arrows>
    {product
      ? product.images.map((image) => {
          return (
            <div>
              <img
                alt=""
                src={image.url}
                width="250px"
                height="250px"
                style={{ objectFit: "cover" }}
              />
            </div>
          );
        })
      : null}
  </Carousel>
);
export default DisplayImage;
