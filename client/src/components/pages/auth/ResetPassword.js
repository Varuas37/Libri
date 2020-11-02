import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Alert from "../../layout/Alert";
import PropTypes from "prop-types";

// Importing Actions
import { login } from "../../../stores/action/auth";

const  ResetPassword = ({ login, isAuthenticated }) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    const { email} = data;
    fetch('/api/auth/reset-password',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email
        })
    }).then(res=>res.json())
    .then(data=>{
      if(data.error){
        console.log(data)
      }
      else{
          console.log("Success")
          //  history.push('/login')
      }
    }).catch(err=>{
        console.log(err)
    })

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
          <h1 className="auth-title"> Libri </h1>
        </Link>
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
       
        <br />
        <button type="submit" className=" authbtn btn btn-primary btn-block ">
       Reset Password
        </button>
   

        <p className="auth-text text-center">
          Don't have an account?
          <Link to="/register" style={{ color: "#1ea1f1" }}>
            {" "}
           Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
ResetPassword.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(ResetPassword);
