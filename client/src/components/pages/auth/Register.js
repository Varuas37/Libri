import React from "react";
import { connect } from "react-redux";
import { Link, Redirect,useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

// Importing Actions
import { registerUser } from "../../../stores/action/auth";
import { createProfile } from "../../../stores/action/profile";

import Alert from "../../layout/Alert";

const Register = ({ registerUser, isAuthenticated }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  let history = useHistory();
  const onSubmit = async (data) => {
    const { name, lastname, email, password, password2 } = data;
  
    registerUser({ name, lastname, email, password, password2 });
    setTimeout(() => { history.push("/login"); }, 3000);

   
  };
  if (isAuthenticated) {
    return <Redirect to="/Home" />;
  }
  return (
    <div className="blackBackground">
      <Alert></Alert>
      <form
        className="form center"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Link style={{ textDecoration: "none" }} to="/">
          <h1 className="auth-title"> Libri</h1>
        </Link>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control form-control-lg"
                placeholder="First Name"
                ref={register({ required: true, minLength: 2 })}
              />
              {errors.name && errors.name.type === "required" && (
                <p className="err-msg">First Name is required</p>
              )}
              {errors.name && errors.name.type === "minLength" && (
                <p className="err-msg">Minimum len 2</p>
              )}
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <input
                type="text"
                name="lastname"
                className="form-control form-control-lg"
                placeholder="Last Name"
                ref={register({ required: true, minLength: 2 })}
              />
              {errors.lastname && errors.lastname.type === "required" && (
                <p className="err-msg"> Last Name is required</p>
              )}
              {errors.lastname && errors.lastname.type === "minLength" && (
                <p className="err-msg">Minimum len 2</p>
              )}
            </div>
          </div>
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            className="form-control form-control-lg"
            placeholder="Email"
            ref={register({
              required: "Enter your e-mail",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Enter a valid e-mail address",
              },
            })}
          />
          {errors.email && <p className="err-msg">{errors.email.message}</p>}
          {errors.email && errors.email.type === "minLength" && (
            <p className="err-msg">Email is required</p>
          )}
        </div>
        <div className="form-group">
          {/* <label htmlFor={name}>{label}</label> */}
          <input
            type="password"
            name="password"
            className="form-control form-control-lg"
            placeholder="Password"
            ref={register({ required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="err-msg">Password is required</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="err-msg">Minimum of 6 characters required</p>
          )}
        </div>
        <div className="form-group">
          {/* <label htmlFor={name}>{label}</label> */}
          <input
            type="password"
            name="password2"
            className="form-control form-control-lg"
            ref={register({
              required: true,
              validate: (value) => value === watch("password"),
            })}
            placeholder="Confirm password"
          />

          {errors.password2 && errors.password2.type === "validate" && (
            <p className="err-msg">Passwords do not match</p>
          )}
          {errors.password2 && errors.password2.type === "required" && (
            <p className="err-msg">Confim password is required</p>
          )}
          {errors.password2 && errors.password2.type === "minLength" && (
            <p className="err-msg">Minimum of 6 characters required</p>
          )}
        </div>
        <div className="padding"></div>
        <button type="submit" className=" authbtn btn btn-primary btn-block ">
          Register
        </button>
        <p className="auth-text text-center" >
          Have an account?
          <Link to="/login" style={{ color: "#1ea1f1" }}> Login</Link>
        </p>
      </form>
    </div>
  );
};
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  createProfile: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { registerUser, createProfile })(
  Register
);
