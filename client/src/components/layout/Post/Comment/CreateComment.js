import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addComment } from "../../../../stores/action/post";
import PropTypes from "prop-types";
import "./Comment.css";
const CreateComment = ({
  addComment,
  auth: { user },
  postID,
  CommentId,
  submitID,
}) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async (data) => {
    addComment(postID, data);
    document.getElementById(CommentId).value = "";
  };

  const [rows, setRows] = useState(1);

  const press = (event) => {
    var text = document.getElementById(CommentId).value;
    if (text == "") {
      document.getElementById(CommentId).rows = "1";
      setRows(1);
    }

    // On pressing Shift and Enter
    if (event.keyCode == 13 && event.shiftKey) {
      document.getElementById(CommentId).rows = rows.toString();

      setRows((prev) => prev + 1);
    }

    // On pressing BackSpace
    if (
      event.which == 8 ||
      (event.which == 46 &&
        document.getElementById(CommentId).rows !== "1" &&
        text !== "")
    ) {
      text = text.split("\n");

      if (!text[text.length - 1]) {
        if (rows !== 1) {
          setRows((prev) => prev - 1);
        }
        document.getElementById(CommentId).rows = rows.toString();
      }
    }

    // On pressing Enter
    if (event.keyCode == 13 && !event.shiftKey) {
      //Stops enter from creating a new line
      event.preventDefault();

      document.getElementById(submitID).click();
      return true;
    }
  };
  return (
    <Fragment>
      <form
        className="comment-wrapper"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="create-post-userImg-sm">
          <img
            src={user && user.avatar}
            alt=""
            height="30px"
            width="30px"
            style={{ borderRadius: "50%" }}
          />
        </div>

        <textarea
          type="text"
          id={CommentId}
          name="text"
          className="comment-content"
          placeholder="Write a comment"
          onKeyDown={press}
          rows={rows}
          ref={register({ required: true, minLength: 2 })}
        ></textarea>
        <button
          id={submitID}
          type="submit"
          style={{ display: "none", position: "absolute" }}
        ></button>
      </form>
    </Fragment>
  );
};
CreateComment.propTypes = {
  addComment: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addComment })(CreateComment);
