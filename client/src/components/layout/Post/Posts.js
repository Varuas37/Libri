import React, { useEffect, Fragment ,useState,useCallback,useRef} from "react";
import { getPosts } from "../../../stores/action/post";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import { withRouter } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import PropTypes from "prop-types";
import { Waypoint } from "react-waypoint";

function Posts({
  posts: { posts, post_loading, userPosts, user_Posts_Loading, comments },
  getPosts,
  auth: { user },
  userProfile,
  userID,

}) {
  
  const [loadedPosts,setLoadedPosts] = useState([])
  const [page,setPageNumber ] = useState(1);
  const [limit,setLimit] = useState(1);
  const [hasMore,setHasMore] = useState(false);
  var p_ost = [];
 
const increasePage =()=>{
  console.log(hasMore)
  if (hasMore){
    setPageNumber(prev=>prev+1);
    console.log("🧐 Page Nymber is being increased")
  }
  else{
  //  console.log("NO more Posts Found");
  }

 }
  useEffect(() => {
    
    p_ost =  getPosts(page, limit);

    p_ost.then(function(result) {
     setHasMore(result.hasMore)
      console.log(result)
      console.log(hasMore)
     setLoadedPosts(loadedPosts.concat(result.results))
  });
  //  return () => {
  //   console.log("This will be logged on unmount");
  // }
  }, [page]);


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
        
        loadedPosts && loadedPosts.length > 0 ? (
          loadedPosts.map((post) => (
            <Fragment>
              <PostItem key={post._id} post={post} comments={loadedPosts.comments}/>
              <Waypoint onEnter={increasePage}/>
            </Fragment>
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
