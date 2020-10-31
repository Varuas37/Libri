import React, { Fragment } from "react";
// import MbSidebar from "../Sidebar/MbSidebar";
import BrandLogo from "../HeaderFooters/TopNavBar/BrandLogo";
import NavigationItems from "../HeaderFooters/TopNavBar/NavigationItems";
import RightHeaderOptions from "../HeaderFooters/TopNavBar/RightHeaderOptions";

const GridWrapper = (props) => {
  return (
    <Fragment>
      <div className="grid-header">
        {!props.branding ? <BrandLogo /> : <div></div>}
        {!props.navItems ? <NavigationItems /> : <div></div>}
        {!props.rightHeader ? <RightHeaderOptions /> : <div></div>}
      </div>
      <div className="grid-wrapper">{props.children}</div>
    </Fragment>
  );
};
export default GridWrapper;
