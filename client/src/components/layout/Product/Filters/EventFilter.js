import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getEvents } from "../../../../stores/action/event";

// CSS
require("../Filters/ProductFilter.css");
function EventFilter({ onChange, event: { events } }) {
  const eventCategory = [];
  events.map((event) => {
    eventCategory.push(event.type);
  });
  const handleChange = (type) => {
    onChange(type);
  };
  return (
    <Fragment>
      <div className="category-filter_wrapper">
        <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>Organized by</p>
        <div className="category-item">
          {eventCategory.map((type) => (
            <div
              key={type}
              className="c-item"
              onClick={() => handleChange(type)}
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

EventFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  event: state.event,
});

export default connect(mapStateToProps, { getEvents })(EventFilter);
