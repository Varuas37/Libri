import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./CommingSoon.css"
export default function CommingSoon() {
  return (
      <Fragment>

     
    <div className="CommingSoon">
      <div className="bgimg">
        <div className="topleft">
            <Link to="/">
            <h3>Libri</h3>
            </Link>
          
        </div>
        <div className="middle">
          <h1>COMING SOON</h1>
       
        </div>
        <div className="bottomleft">
          <p>A man can only do so much. Rest assured, I am working on this feature. I am not procastinating. Sorry for the bright colors. Just wanted to let you know that I love deadpool. </p>
        </div>
      </div>
    </div>
    </Fragment>
  );
}
