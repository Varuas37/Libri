import React, { Fragment } from "react";
import Moment from "react-moment";
const EventItem = ({ event }) => {
  return (
    <Fragment>
      <div className="product-item">
        <div className="product-img">
          {" "}
          <img
            className="product-img-i"
            src={event.images[0].url}
            alt=""
            height="100%"
            width="100%"
          />
        </div>
        <div className="product-details">
          <div className="event-title">{event.title}</div>
          <div className=" event-location ">
            {" "}
            <Moment className="event-location" format="MMM Do, h:mm a">
              {event.startDate}
            </Moment>
          </div>
          <div className=" date">
            <i class="fas fa-map-marker-alt"></i> {"  "}
            {event.location}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EventItem;
