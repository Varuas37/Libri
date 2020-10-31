import React from "react";

import ListingForm from "../../../../layout/CreateListing/ListingForm";
import GridWrapper from "../../../../layout/GridWrapper/GridWrapper";

const ListBooks = (props) => {
  return (
    <div>
      <GridWrapper>
        <ListingForm title="Create Listing For Books"></ListingForm>
      </GridWrapper>
    </div>
  );
};

export default ListBooks;
