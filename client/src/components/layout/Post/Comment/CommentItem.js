import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Comment.css";
import { deleteComment } from "../../../../stores/action/post";
import { Link } from "react-router-dom";
import Modal from "../../Modal/Modal";
const CommentItem = ({
  postID,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  const modalRef = React.useRef();
  const openModal = () => {
    modalRef.current.openModal();
  };
  return (
    <Fragment>
      <Modal ref={modalRef}>
        <div id="pop-over-modal" className="pop-over-modal">
          <div class="pop-over-modal-container">
            <div class="pop-over-modal-header">
              <div>Delete Comment?</div>
              <span className="closeModal">
                <i
                  title="Close Modal"
                  class="pop-over-modal-close fas fa-times"
                  onClick={() => modalRef.current.close()}
                ></i>
              </span>
            </div>
            <div className="borderline" style={{ marginBottom: "5px" }}></div>

            <div class="pop-over-modal-content">
              <p>Are you sure you want to delete this Comment?</p>
            </div>
            <div class="pop-over-modal-buttons">
              <div
                type="button"
                class="cancelbtn"
                onClick={() => modalRef.current.close()}
              >
                Cancel
              </div>

              <button
                class="deletebtn"
                onClick={() => deleteComment(postID, _id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="comment-text-wrapper">
        <span className="">
          <Link to={`/profile/${user}`}></Link>
          <img
            src={avatar}
            style={{ borderRadius: "20px" }}
            alt=""
            height="32px"
            width="32px"
          />

          {/* <span className="date">
              {" "}
              <Moment className="date" format="MMMM  [at] h:mm A">
                {date}
              </Moment>
            </span> */}
        </span>
        <div className="comment-text">
          {!auth.loading && user === auth.user._id ? (
            <Link to={`/profile/`} className="user-name">
              <span style={{ fontSize: "0.9em" }}>{name}</span>
            </Link>
          ) : (
            <Link to={`/profile/${user}`} className="user-name">
              <span style={{ fontSize: "0.9em" }}>{name}</span>
            </Link>
          )}
          <span>{text}</span>
        </div>
        {!auth.loading && user === auth.user._id && (
          <span className="comment-options">
            <i className="fas fa-ellipsis-h " onClick={openModal}></i>
          </span>
        )}
      </div>
      {/* <div className="comment-text-wrapper">
        <span style={{ fontSize: "smaller" }}>Like</span>
        <span style={{ fontSize: "smaller" }}>Reply</span>{" "}
      </div> */}
    </Fragment>
  );
};

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
