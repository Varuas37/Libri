import React from "react";
import ImageUploader from "react-images-upload";
import axios from "axios";
import { response } from "express";
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(picture) {
    this.setState({
      pictures: this.state.pictures.concat(picture),
    });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("file", files[0]);
    axios
      .post("/api/products/image-upload", formData, config)
      .then((response) => {
        {
          console.log(response.data);
        }
        {
          console.log("😎");
        }

        this.setState(
          {
            pictures: [...this.state.pictures, response.data],
          },
          () => {
            this.props.uploadedImg(this.state.pictures);
          }
        );
      });
  }

  render() {
    return (
      <ImageUploader
        withIcon={true}
        buttonText="Choose images"
        onChange={this.onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
    );
  }
}
export default ImageUpload;
