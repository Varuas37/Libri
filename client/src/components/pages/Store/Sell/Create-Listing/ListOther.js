import React from "react";

import GridWrapper from "../../../../layout/GridWrapper/GridWrapper";
import ListingForm from "../../../../layout/CreateListing/ListingForm";

const ListOther = (props) => {
  return (
    <div>
      <GridWrapper>
        <ListingForm
          title="Create Listing for College Essentials"
          productType="collegeEssential"
        />
      </GridWrapper>
    </div>
  );
};

export default ListOther;
