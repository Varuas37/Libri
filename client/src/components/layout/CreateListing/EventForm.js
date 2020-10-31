import React, { Fragment, useState } from "react";
import "./ListingForm.css";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Select from "react-select";
import UploadImage from "../UploadImage/UploadImage";
import { connect } from "react-redux";
import { addEvent } from "../../../stores/action/event";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

// STYLING FOR SELECT
const options = [
  { value: "new", label: "Brand New" },
  { value: "excellent", label: "Excellent" },
  { value: "used", label: "Used" },
  { value: "acceptable", label: "Acceptable" },
  { value: "poor", label: "Poor" },
];
const customStyles = {
  option: (provided, state) => ({
    ...provided,

    color: state.isSelected ? "gray" : "black",

    height: "100%",
    fontSize: "17px",
  }),
  control: () => ({
    width: "100%",
    height: "100%",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    return { ...provided, opacity, transition };
  },
  dropdownIndicator: () => ({
    display: "none",
  }),
  placeholder: () => ({
    placeholder: "Condition",
  }),
};

// FUNCTIONAL COMPONENT STARTS HERE
const EventForm = ({
  addEvent,
  title,
  auth: { isAuthenticated, loading, user },
}) => {
  const { register, handleSubmit, watch, errors, setValue } = useForm();

  const [images, setimages] = useState(null);
  const [date, setDate] = useState(null);
  const [onCampus, setOnCampus] = useState(false);
  const [free, setfree] = useState(false);
  const [endDate, setEndDate] = useState(null);
  let history = useHistory();
  console.log(watch("example"));
  console.log(images);

  // ON SUBMIT
  const onSubmit = (data) => {
    // ON SUBMIT WORK DONE HERE.

    if (free) {
      data.price = "0";
    } else {
      return null;
    }
    const { title, price, condition, description } = data;
    const formData = new FormData();
    images.map((image, index) => {
      formData.append(`image`, image.file);
      console.log(image.file);
    });

    fetch("http://localhost:3000/api/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((success) => {
        data = {
          ...data,
          images: success.data,
          category: "event",
          startDate: date,
          endDate: endDate,
        };
        addEvent(data);
        history.push("/store/you/selling");
        console.log(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Fragment>
      <div className="blackBackground ListingForm-wrapper">
        <div className="form-wrapper">
          <form className="listing-form" onSubmit={handleSubmit(onSubmit)}>
            <br></br>
            <div className="UserwithIcon">
              <img
                src={user.avatar}
                alt="User Profile picture"
                height="40px"
                width="40px"
                className="round-image"
              />
              <span className="user-name">
                <span style={{ fontSize: "15px" }}>{user.name}</span>
                <span className="sub-text">Listing to Store</span>
              </span>
            </div>

            <UploadImage
              setImages={(uploadedImg) => setimages(uploadedImg)}
              onChange={(e) => setValue("images", e.target.value)}
            ></UploadImage>
            <br></br>
            <div className="form-group">
              <input
                type="text"
                name="title"
                className="form-control form-control-lg"
                placeholder="Title"
                ref={register({ required: true, minLength: 2 })}
              />
              {errors.name && errors.name.type === "required" && (
                <p className="err-msg">Title is required</p>
              )}
              {errors.name && errors.name.type === "minLength" && (
                <p className="err-msg">Minimum len 2</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="location"
                className="form-control form-control-lg"
                placeholder="Location"
                ref={register({ required: true, minLength: 2 })}
              />
              {errors.name && errors.name.type === "required" && (
                <p className="err-msg">Location is required</p>
              )}
              {errors.name && errors.name.type === "minLength" && (
                <p className="err-msg">Minimum len 2</p>
              )}
            </div>

            <span className="row" style={{ paddingTop: "10px" }}>
              <div className="col">
                <div className="form-group">
                  {free ? (
                    <input
                      type="text"
                      name="price"
                      className="form-control form-control-lg"
                      placeholder="Free Event"
                      disabled="disabled"
                      ref={register({
                        required: false,
                        minLength: 1,
                        maxLength: 5,
                      })}
                    />
                  ) : (
                    <input
                      type="text"
                      name="price"
                      className="form-control form-control-lg"
                      placeholder="Price"
                      ref={register({
                        required: true,
                        minLength: 1,
                        maxLength: 5,
                      })}
                    />
                  )}

                  {/* {errors.name && errors.name.type === "required" && (
                    <p className="err-msg">Price is required</p>
                  )} */}
                  {errors.name && errors.name.type === "minLength" && (
                    <p className="err-msg">Minimum len 2</p>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <select
                    name="type"
                    ref={register({
                      required: true,
                    })}
                    className="form-control"
                    id="exampleFormControlSelect1"
                    placeholder="Select Category"
                    style={{ paddingTop: "10px" }}
                  >
                    <option selected="true" disabled="disabled">
                      Select the type of Event
                    </option>
                    <option>Student Organizations</option>
                    <option>Greek Life</option>
                    <option>SGA</option>
                    <option>Volunteering Opportunity</option>
                    <option>Networking Event</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </span>
            <div className="date-picker">
              <div className="form-group">
                <i class="fas fa-calendar"></i>
                <DatePicker
                  placeholderText="Start Date"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  className=" form-control form-control-lg form-description"
                  minDate={Date.now()}
                />
              </div>
              <div className="form-group">
                <i class="fas fa-clock"></i>
                <DatePicker
                  placeholderText="Start Time"
                  name="startDate"
                  selected={date}
                  onChange={(date) => setDate(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Start Time"
                  dateFormat="h:mm aa"
                  className=" form-control form-control-lg form-description"
                />
              </div>
            </div>
            <div className="date-picker">
              <div className="form-group">
                <i class="fas fa-calendar"></i>
                <DatePicker
                  placeholderText="End Date"
                  selected={endDate}
                  onChange={(endDate) => setEndDate(endDate)}
                  className="form-control form-control-lg form-description"
                  minDate={date}
                />
              </div>
              <div className="form-group">
                <i class="fas fa-clock"></i>
                <DatePicker
                  placeholderText="Start Time"
                  selected={endDate}
                  onChange={(endDate) => setEndDate(endDate)}
                  minDate={date}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="End Time"
                  dateFormat="h:mm aa"
                  className=" form-control form-control-lg form-description"
                />
              </div>
            </div>

            <div className="form-group">
              <textarea
                type="text"
                name="description"
                className="form-control form-control-lg form-description"
                placeholder="Description"
                ref={register({ required: true, minLength: 2 })}
                rows="5"
              />
              {errors.name && errors.name.type === "required" && (
                <p className="err-msg">Description is required</p>
              )}
              {errors.name && errors.name.type === "minLength" && (
                <p className="err-msg">Minimum characters 2</p>
              )}
            </div>
            <div className="checkmarks-wrapper">
              <label class="checkbox-container">
                On-Campus Event
                <input
                  type="checkbox"
                  name="onCampus"
                  onClick={(e) => {
                    e.target.checked ? setOnCampus(true) : setOnCampus(false);
                  }}
                  ref={register({})}
                />
                <span class="checkmark"></span>
              </label>
              <label class="checkbox-container">
                Free
                <input
                  type="checkbox"
                  onClick={(e) => {
                    e.target.checked ? setfree(true) : setfree(false);
                  }}
                />
                <span class="checkmark"></span>
              </label>
              <label class="checkbox-container">
                Free Food
                <input type="checkbox" name="freeFood" ref={register({})} />
                <span class="checkmark"></span>
              </label>
            </div>

            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <button
              type="submit"
              className=" authbtn btn btn-primary btn-block "
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

EventForm.propTypes = {
  addEvent: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addEvent })(EventForm);
