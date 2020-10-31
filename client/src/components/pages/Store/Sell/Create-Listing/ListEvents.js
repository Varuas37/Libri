import React from "react";

import EventForm from "../../../../layout/CreateListing/EventForm";

import BrandLogo from "../../../../layout/HeaderFooters/TopNavBar/BrandLogo";
import NavigationItems from "../../../../layout/HeaderFooters/TopNavBar/NavigationItems";
import RightHeaderOptions from "../../../../layout/HeaderFooters/TopNavBar/RightHeaderOptions";

const ListEvents = (props) => {
  return (
    <div className="blackBackground">
      <div className="grid-header">
        <BrandLogo />
        <NavigationItems />
        <RightHeaderOptions />
      </div>
      <EventForm></EventForm>
    </div>
  );
};

export default ListEvents;
