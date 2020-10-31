import React, { Fragment, useState } from "react";
import ImageUploading from "react-images-uploading";
import "./UploadImage.css";
import axios from "axios";
// import { response } from "express";
const imgUploadImage = require("./UploadImage.png");
const UploadImage = ({ setImages }) => {
  const maxNumber = 5;
  const onChange = (imageList) => {
    setImages(imageList);
    setUploadedImages(imageList);
  };

  const [uploadImages, setUploadedImages] = useState("");
  return (
    <Fragment>
      <div className="img-container">
        <ImageUploading
          multiple
          onChange={onChange}
          maxNumber={maxNumber}
          imgExtension={[".jpg", ".png"]}
          maxFileSize={5242880}
        >
          {({ imageList, onImageUpload, onImageRemoveAll }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              &nbsp;
              {imageList.map((image) => (
                <div key={image.key} className="image-item">
                  <img
                    src={image.dataURL}
                    alt=""
                    name="image"
                    height="90"
                    width="90"
                    className="uploadedImage"
                    onClick={image.onUpdate}
                  />
                  <div className="image-item__btn-wrapper">
                    {/* <button onClick={image.onUpdate}>Update</button> */}
                    <i className="fas fa-times" onClick={image.onRemove}></i>
                    {/* <button onClick={image.onRemove}>Remove</button> */}
                  </div>
                </div>
              ))}
              <img
                className="uploadImagebutton"
                src={imgUploadImage}
                onClick={onImageUpload}
                height="90"
                width="90"
                name="image"
              ></img>
            </div>
          )}
        </ImageUploading>
      </div>
    </Fragment>
  );
};

export default UploadImage;
{
  /* <button onClick={onImageRemoveAll}>Remove all images</button> */
}
