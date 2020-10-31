import React, { Fragment, useState, useEffect } from "react";
import { getPosts, getUsersPosts } from "../../../stores/action/post";
import { connect } from "react-redux";
import Moment from "react-moment";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";
import { addLike, removeLike, deletePost } from "../../../stores/action/post";
import PropTypes from "prop-types";
import CommentItem from "./Comment/CommentItem";
import CreateComment from "./Comment/CreateComment";
import Spinner from "../Spinner/Spinner";
const inconLike = require("./Asset/like.png");
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  key,
  post: { _id, text, name, avatar, user, likes, comments, date, loading },
}) => {
  useEffect(() => {
    getPosts();
    if (likes.some((like) => like.user.toString() === auth.user._id)) {
      setLiked(true);
    }
  }, [likes, comments]);
  const modalRef = React.useRef();
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(true);

  const handleDisplayComment = () => {
    if (showComments == true) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
  };
  const openModal = () => {
    modalRef.current.openModal();
  };
  const handleLike = (id) => {
    if (liked) {
      removeLike(id);
      setLiked(!liked);
    } else {
      addLike(id);
      setLiked(!liked);
    }
  };
  const generateUID = (length) => {
    return window
      .btoa(
        Array.from(window.crypto.getRandomValues(new Uint8Array(length * 2)))
          .map((b) => String.fromCharCode(b))
          .join("")
      )
      .replace(/[+/]/g, "")
      .substring(0, length);
  };

  const CommentId = generateUID(5);
  const submitID = generateUID(5);
  return (
    <Fragment>
      {/* MODAL MESSAGE */}
      <Modal ref={modalRef}>
        <div id="pop-over-modal" className="pop-over-modal">
          <div class="pop-over-modal-container">
            <div class="pop-over-modal-header">
              <div>Delete Post?</div>
              <i
                title="Close Modal"
                class="pop-over-modal-close fas fa-times"
                onClick={() => modalRef.current.close()}
              ></i>
            </div>

            <div class="pop-over-modal-content">
              <p>Are you sure you want to delete this post?</p>
            </div>
            <div class="pop-over-modal-buttons">
              <div
                type="button"
                class="cancelbtn"
                onClick={() => modalRef.current.close()}
              >
                Cancel
              </div>

              <button class="deletebtn" onClick={() => deletePost(_id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {/* END MODAL ELEMENT */}

      <div className="post-container">
        <div className="header">
          <span className=" user-img">
            <Link to={`/profile/${user}`}></Link>
            <img
              src={avatar}
              style={{ borderRadius: "20px" }}
              alt=""
              height="40px"
              width="40px"
            />
          </span>

          <span className="user-info">
            {!auth.loading && user === auth.user._id ? (
              <Link to={`/profile/`} className="user-name">
                {name}
              </Link>
            ) : (
              <Link to={`/profile/${user}`} className="user-name">
                {name}
              </Link>
            )}

            <span className="date">
              {" "}
              <Moment className="date" format="MMMM  [at] h:mm A">
                {date}
              </Moment>
            </span>
          </span>
          {!auth.loading && user === auth.user._id && (
            <i
              className="fas fa-trash-alt post-options"
              onClick={openModal}
            ></i>
          )}
        </div>

        <p className="post-text">{text}</p>
        <div className="like-comment-stat">
          {likes.length > 0 ? (
            <span style={{ padding: "1%" }}>
              {" "}
              <img
                src={inconLike}
                height="20px"
                width="20px"
                style={{ borderRadius: "50%" }}
              />{" "}
              {likes.length}
            </span>
          ) : null}
          {comments.length > 0 ? (
            <span
              style={{ padding: "1%" }}
              onClick={handleDisplayComment}
              id="noOfComments"
            >
              {" "}
              {comments.length} Comments
            </span>
          ) : null}
        </div>

        <div className="borderline"></div>
        <div className="like-comment">
          <button className="button btn-like">
            <i
              className={liked ? "blue fas fa-thumbs-up " : "far fa-thumbs-up"}
              onClick={() => handleLike(_id)}
            >
              {"  "}Like
            </i>
          </button>
          <button className="button btn-comment">
            <i className="far fa-comment-alt" onClick={handleDisplayComment}>
              {"  "} Comments
            </i>
          </button>
          <button className="button btn-share">
            <i className="fas fa-share"> {"  "} Share</i>
          </button>
        </div>

        {showComments ? (
          <Fragment>
            <div className="borderline"></div>
            <CreateComment
              postID={_id}
              CommentId={CommentId}
              submitID={submitID}
            ></CreateComment>
            {/* {comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} postId={_id} />
            ))} */}
            {/* <CommentItem key={comment._id} comment={comment} postID={_id} /> */}
            {console.log(comments)}
            {comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} postID={_id} />
            ))}
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,

  getPosts: PropTypes.func.isRequired,
  getUsersPosts: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getPosts,
  getUsersPosts,
  addLike,
  removeLike,
  deletePost,
})(PostItem);
