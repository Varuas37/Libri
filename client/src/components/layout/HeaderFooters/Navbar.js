import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../../stores/action/auth";
import auth from "../../../stores/reducer/auth";
const Navbar = ({ logout, auth: { isAuthenticated, loading, name } }) => {
  const authLinks = (
    <ul>
      <li className="active">
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/study">Study</Link>
      </li>

      <li className="drop-down">
        <Link to="/store">Shop</Link>
        <ul>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/college-essentials">College Essentials</Link>
          </li>

          <li>
            <Link to="/notes">Notes</Link>
          </li>
          <li>
            <Link to="/sell">Sell</Link>
          </li>
        </ul>
      </li>
      <li className="drop-down">
        <Link to="/store">{name}</Link>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>

          <Link to="/">
            <a onClick={logout} href="!#">
              Logout
            </a>
          </Link>
        </ul>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li className="active">
        <Link to="/">Home</Link>
      </li>

      <li className="drop-down">
        <Link to="/store">Shop</Link>
        <ul>
          <li>
            <Link to="/books">Books</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
          <li>
            <Link to="/college-essentials">College Essentials</Link>
          </li>

          <li>
            <Link to="/notes">Notes</Link>
          </li>
        </ul>
      </li>

      <li className="get-started">
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <div>
      <header id="header">
        <div className="container d-flex align-items-center">
          <div className="logo mr-auto">
            <h1 className="text-light">
              <Link to="/">Libri</Link>
            </h1>
          </div>
          <nav className="nav-menu d-none d-lg-block">
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </nav>
        </div>
        <script src="assets/js/main.js"></script>
      </header>
    </div>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
