import React, { Fragment, useState } from "react";
import Modal from "react-modal";

const PopoverAlert = () => {
  return (
    <Fragment>
      <div
        id="pop-over-modal"
        className="pop-over-modal"
        style={{
          backgroundColor: "none",
        }}
      >
        <form class="pop-over-modal-container" action="/action_page.php">
          <div class="pop-over-modal-header">
            <div>Delete Post?</div>
            <i
              title="Close Modal"
              class="pop-over-modal-close fas fa-times"
            ></i>
          </div>

          <div class="pop-over-modal-content">
            <p>Are you sure you want to delete this post?</p>
          </div>
          <div class="pop-over-modal-buttons">
            <div type="button" class="cancelbtn">
              Cancel
            </div>
            <div type="button" class="deletebtn">
              Delete
            </div>
          </div>
        </form>
      </div>
    </Fragment>
  );
};
export default PopoverAlert;
