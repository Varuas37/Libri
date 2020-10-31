import React, { Fragment, useState } from "react";
import "./ListingForm.css";
import { useForm } from "react-hook-form";
// import Select from "react-select";
import UploadImage from "../UploadImage/UploadImage";
import { connect } from "react-redux";
import { addProduct } from "../../../stores/action/product";
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
const ListingForm = ({
  addProduct,
  title,
  productType,
  auth: { isAuthenticated, loading, user },
}) => {
  const { register, handleSubmit, watch, errors, setValue } = useForm();
  let history = useHistory();
  const [images, setimages] = useState(null);

  console.log(watch("example"));
  console.log(images);

  // ON SUBMIT
  const onSubmit = (data) => {
    // ON SUBMIT WORK DONE HERE.
    if (images == null && images.length > 0) {
      alert("No images found");
    } else {
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
          data = { ...data, images: success.data, category: `${productType}` };
          addProduct(data);
          history.push("/store/you/selling");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Fragment>
      <div className="blackBackground ListingForm-wrapper">
        <div className="form-wrapper">
          <form className="listing-form" onSubmit={handleSubmit(onSubmit)}>
            <h5>{title}</h5>
            <UploadImage
              setImages={(uploadedImg) => setimages(uploadedImg)}
              onChange={(e) => setValue("images", e.target.value)}
            ></UploadImage>
            <br></br>
            <div className="UserwithIcon">
              <img
                src={user && user.avatar}
                alt=""
                height="40px"
                width="40px"
                className="round-image"
              />
              <span className="user-name">
                <span style={{ fontSize: "15px" }}>{user && user.name}</span>
                <span className="sub-text">Listing to Store</span>
              </span>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="title"
                className="form-control form-control-lg"
                placeholder="Title"
                ref={register({ required: true, minLength: 2, maxLength: 100 })}
              />
              {errors.title && errors.title.type === "required" && (
                <p className="err-msg">Title is required</p>
              )}
              {errors.title && errors.title.type === "minLength" && (
                <p className="err-msg">Minimum len 2</p>
              )}
            </div>

            <span className="row" style={{ paddingTop: "10px" }}>
              <div className="col">
                <div className="form-group">
                  <input
                    type="number"
                    name="price"
                    className="form-control form-control-lg"
                    placeholder="Price"
                    ref={register({
                      required: true,
                      minLength: 1,
                      maxLength: 5,
                    })}
                  />
                  {errors.price && errors.price.type === "required" && (
                    <p className="err-msg">Price is required</p>
                  )}
                  {errors.price && errors.price.type === "minLength" && (
                    <p className="err-msg">Please enter a price</p>
                  )}
                  {errors.price && errors.price.type === "maxLength" && (
                    <p className="err-msg">
                      Items worth more than 99999 are not allowed for sale
                    </p>
                  )}
                </div>
              </div>
              <div className="col">
                <div className="form-group">
                  <select
                    name="condition"
                    ref={register({
                      required: true,
                    })}
                    className="form-control"
                    id="exampleFormControlSelect1"
                    placeholder="Select Category"
                    style={{ paddingTop: "10px" }}
                  >
                    <option>Brand New</option>
                    <option>Excellent</option>
                    <option>Very Good</option>
                    <option>Good</option>
                    <option>Poor</option>
                  </select>
                </div>
              </div>
              {errors.condition && errors.condition.type === "required" && (
                <p className="err-msg">Price is required</p>
              )}
            </span>

            <div className="form-group">
              <textarea
                type="text"
                name="description"
                className="form-control form-control-lg form-description"
                placeholder="Description"
                ref={register({ required: true, minLength: 2 })}
                rows="5"
              />
              {errors.description && errors.description.type === "required" && (
                <p className="err-msg">Description is required</p>
              )}
              {errors.description &&
                errors.description.type === "minLength" && (
                  <p className="err-msg">Minimum characters 2</p>
                )}
            </div>

            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <button
              type="submit"
              className=" authbtn btn btn-primary btn-block "
            >
              Create Listing
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

ListingForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
  productType: PropTypes.string.isRequired,
};
ListingForm.defaultProps = {
  productType: "book",
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addProduct })(ListingForm);
