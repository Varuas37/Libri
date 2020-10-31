import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../layout/Spinner/Spinner";
import { getCurrentProfile } from "../../../stores/action/profile";
import { getPosts } from "../../../stores/action/post";
import PropTypes from "prop-types";

// Importing Components
import Posts from "../../layout/Post/Posts";
import GridWrapper from "../../layout/GridWrapper/GridWrapper";
import Sidebar from "../../layout/Sidebar/Sidebar";
import SidebarElements from "../../layout/Sidebar/SidebarElements";
import ContentWrapper from "../../layout/GridWrapper/ContentWrapper";
import CreatePost from "../../layout/Post/CreatePost";
import RightSidebar from "../../layout/Sidebar/RightSidebar";

// Importing Images for Sidebar

const StudyImg = require("../../../assets/HomePage/Course.png");
const MessengerImg = require("../../../assets/HomePage/Messenger.png");
const GroupImg = require("../../../assets/HomePage/GroupImg.png");
const MarketPlaceImg = require("../../../assets/HomePage/MarketPlace.png");
const EventsImg = require("../../../assets/HomePage/Events.png");
const BookIcon = require("../../../assets/HomePage/BookIcon.png");
// const UserImg = require("../../../assets/HomePage/UserImg.png");

const Home = ({
  getCurrentProfile,

  auth: { user },
  profile: { loading, profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <GridWrapper>
        <Sidebar>
          <Link to="/profile">
            <SidebarElements
              name={user && user.name}
              img={user && user.avatar}
            ></SidebarElements>
          </Link>
          <Link to="/message">
            {" "}
            <SidebarElements
              name="Messages"
              img={MessengerImg}
            ></SidebarElements>
          </Link>
          <Link to="/courses">
            {" "}
            <SidebarElements name="Courses" img={StudyImg}></SidebarElements>
          </Link>
          <Link to="/groups">
            <SidebarElements name="Groups" img={GroupImg}></SidebarElements>
          </Link>
          <Link to="/books">
            <SidebarElements name="Books" img={BookIcon}></SidebarElements>
          </Link>
          <Link to="/store">
            {" "}
            <SidebarElements name="Shop" img={MarketPlaceImg}></SidebarElements>
          </Link>
          <Link to="/events">
            {" "}
            <SidebarElements name="Events" img={EventsImg}></SidebarElements>
          </Link>
        </Sidebar>

        <ContentWrapper>
          <CreatePost></CreatePost>
          {/* <PostItem></PostItem> */}
          <Posts></Posts>
          {/* <div className="ending-item">
            <button className="btn btn-primary">Load More</button>
          </div> */}
          <br></br>
          <br></br>
        </ContentWrapper>
        <RightSidebar></RightSidebar>
      </GridWrapper>
    </Fragment>
  );
};
Home.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  // posts: state.post,
});
export default connect(mapStateToProps, { getCurrentProfile })(Home);
