import React, { useEffect } from "react";
import ProfileHeader from "../../layout/Profile/ProfileHeader";
import GridWrapper from "../../layout/GridWrapper/GridWrapper";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import ContentWrapper from "../../layout/GridWrapper/ContentWrapper";
import RightSidebar from "../../layout/Sidebar/RightSidebar";
import Sidebar from "../../layout/Sidebar/Sidebar";
import { getUsersPosts } from "../../../stores/action/post";
import { getProfileById } from "../../../stores/action/profile";
import CreatePost from "../../layout/Post/CreatePost";
import Posts from "../../layout/Post/Posts";
const Profile = ({
  auth: { isAuthenticated, loading, user },
  match,
  profile,
  getUsersPosts,
  getProfileById,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [match.params.id]);
  useEffect(() => {
    getUsersPosts(match.params.id);
  }, []);
  return (
    <div>
      <GridWrapper>
        <Sidebar></Sidebar>
        <ContentWrapper>
          <ProfileHeader profile={profile} otherUser={true}></ProfileHeader>

          <Posts userProfile={true} userID={match.params.id}></Posts>
          <br></br>
          <br></br>
        </ContentWrapper>
        <RightSidebar />
      </GridWrapper>
    </div>
  );
};

Profile.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  getUsersPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getProfileById, getUsersPosts })(
  Profile
);
