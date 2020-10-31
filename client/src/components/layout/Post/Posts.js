import React, { useEffect, Fragment } from "react";
import { getPosts } from "../../../stores/action/post";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import { withRouter } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import PropTypes from "prop-types";

function Posts({
  posts: { posts, post_loading, userPosts, user_Posts_Loading, comments },
  getPosts,
  auth: { user },
  userProfile,
  userID,
}) {
  useEffect(() => {
    getPosts();
  }, []);

  return userPosts && post_loading && posts && user_Posts_Loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {
        userProfile ? (
          userPosts && userPosts.length > 0 ? (
            userPosts.map((post) => <PostItem key={post._id} post={post} />)
          ) : (
            <h2>User's posts not found</h2>
          )
        ) : // END OF PROFILE LOOP
        posts && posts.length > 0 ? (
          posts.map((post) => (
            <PostItem key={post._id} post={post} comments={posts.comments} />
          ))
        ) : (
          <p></p>
        )
        // END OF POST LOOP
      }
    </Fragment>
  );
}

Posts.propTypes = {
  posts: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  posts: state.post,
  auth: state.auth,
});
export default withRouter(connect(mapStateToProps, { getPosts })(Posts));
