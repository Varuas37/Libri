import React, { Fragment } from "react";
// import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileHeader = ({
  auth: { isAuthenticated, loading },
  profile: { profile },
  match,
  otherUser,
}) => {
  return (
    <Fragment>
      <div className="profile-header">
        <div className="profile-pictureWrapper">
          <div className="profile-picture">
            <img
              src={profile.user.avatar}
              className="rounded"
              height="200px"
              width="200px"
              alt=""
            />
          </div>
        </div>

        <div className="profile-userInfo">
          {profile.user.name} {" " + profile.user.lastname}
          <br />
          <span className="description">{profile.bio}</span>
        </div>
        <div className="profile-options">
          <div className="profile-elements-wrapper">
            <div className="profile-o-elements">Timeline</div>
            <div className="profile-o-elements">About</div>
            <div className="profile-o-elements">Friends</div>
          </div>
          <div className="profile-buttons-wrapper">
            {/* <div className="profile-buttons">
              <i className="fas fa-user-plus"></i> Add Friend
            </div> */}
            {otherUser ? (
              <div className="profile-buttons">
                <i className="fas fa-user-profile"></i> Add Friend
              </div>
            ) : (
              <div className="profile-buttons">
                <i className="fas fa-user-profile"></i> Edit Profile
              </div>
            )}

            <div className="profile-buttons">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="profile-buttons">
              <i className="fas fa-ellipsis-h"></i>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
ProfileHeader.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(ProfileHeader);
