import React from "react";
import { Link, Redirect,useParams,useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";

// Importing Actions
import { newPassword } from "../../../stores/action/auth";

const NewPassword = ({ newPassword, isAuthenticated }) => {
  const { register, handleSubmit, errors,watch } = useForm();
  let history = useHistory();
  const onSubmit = (data,e) => {
    const {password } = data;
    newPassword(password,token);
    history.push("/login");
  };
  const {token} =useParams();
console.log(token);
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
        
        <div className="form-group">
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
        <br />
        <button type="submit" className=" authbtn btn btn-primary btn-block ">
          Reset Password
        </button>
        <p className="auth-text text-center">
          Have an account?
          <Link to="/login" style={{ color: "#1ea1f1" }}>
            {" "}
           Login
          </Link>
        </p>
      </form>
    </div>
  );
};
NewPassword.propTypes = {
  newPassword: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { newPassword })(NewPassword);
