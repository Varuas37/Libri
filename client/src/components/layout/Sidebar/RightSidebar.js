import React from "react";

import SidebarElements from "./SidebarElements";
import CoursesWrapper from "../GridWrapper/CoursesWrapper";
import ContactWrapper from "../GridWrapper/ContactWrapper";
const RightSidebar = (props) => {
  return <div className="grid-rightSidebar">{props.children}</div>;
};
export default RightSidebar;
