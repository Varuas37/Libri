import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import Modal from "../Modal/Modal";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addPost } from "../../../stores/action/post";
const CreatePost = ({ addPost, auth: { user } }) => {
  const modalRef = React.useRef();
  const openModal = () => {
    modalRef.current.openModal();
  };
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    
    addPost(data);
    modalRef.current.close();
  };
  return (
    <Fragment>
      {/* CREATE POST MODAL */}
      {/* MODAL MESSAGE */}
      <Modal ref={modalRef}>
        <div className="create-post-container">
          <div className="create-post-header">
            <div className="create-post-title">
              <h5>Create Post</h5>
            </div>
            <div
              className="post-cancel-icon fas fa-times"
              onClick={() => modalRef.current.close()}
            ></div>
          </div>
          <div className="create-post-user-info">
            <div className="create-post-userImg">
              <img
                src={user && user.avatar}
                alt=""
                height="40px"
                width="40px"
                style={{ borderRadius: "50%" }}
              />
            </div>
            <span className="post-user-name">
              <span>
                {user && user.name} {"  "} {user.lastname}
              </span>
              <Moment className="date" format="MMMM  [at] h:mm A">
                {Date.now()}
              </Moment>

              {/* <span class="fas fa-lock"> Only me</span> */}
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <textarea
              type="text"
              name="text"
              class="post-content"
              placeholder="What's on your mind, Saurav?"
              ref={register({ required: true, minLength: 1 })}
            ></textarea>
            {errors.text && <p className="err-msg">{errors.text.message}</p>}
            {errors.text && errors.text.type === "minLength" && (
              <p className="err-msg">Minimum 1 character required</p>
            )}
            <div style={{display:"flex", justifyContent:"space-between" }}>
            <span>Post to</span>
            <select name="postTo" id="postTo" className="form-group" ref={register}>
              <option value="university">University</option>
              <option value="friends">Friends</option>
              <option value="both">Both</option>
            </select>
            </div>
       
            <button type="submit" class="post-btn">
              Post
            </button>
          </form>
        </div>
      </Modal>
      <div className="create-post-container-sm">
        <div className="create-post-userImg-sm">
          <img
            src={user && user.avatar}
            alt=""
            height="30px"
            width="30px"
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div
          type="text"
          className="post-content-sm"
          placeholder="What's on your mind?"
          onClick={openModal}
        >
          <span style={{ color: "gray" }}>What's on your mind?</span>
        </div>
      </div>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { addPost })(CreatePost);
