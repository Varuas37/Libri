const express = require("express");
const connectDB = require("../config/db");
var fileupload = require("express-fileupload");

var bodyParser = require("body-parser");
const app = express();

//Connect to DB
connectDB();
//Init Middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Check if the api is running
app.get("/", (req, res) =>
  res.send("<h1> Hello there 😎</h1><p>The Server is Running</p>")
);

// MULTER AND CLOUDINARY IMAGE UPLOAD
const upload = require("./multer");
const cloduinary = require("./cloudinary");
const fs = require("fs");

app.use("/api/image/upload", upload, async (req, res) => {
  const uploader = async (path) => await cloduinary.uploads(path, "Libri");

  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    try {
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      res.status(200).json({
        message: "Congrats Uploaded Successfully",
        reqdata: req.files,
        data: urls,
      });
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }
  } else {
    res.status(400).json({
      message: "Images Didn't Upload Successfully",
    });
  }
});

//Routes for User and Authentication.
app.use("/api/users", require("./routes/api/user/users"));
app.use("/api/profile", require("./routes/api/user/profile"));
app.use("/api/auth", require("./routes/api/user/auth"));
//Routes for Products
app.use("/api/category", require("./routes/api/product/category"));
app.use("/api/products", require("./routes/api/product/products"));
app.use("/api/events", require("./routes/api/product/events"));
app.use("/api/university", require("./routes/api/university/university"));
// Routes for Posts and Comments
app.use("/api/posts", require("./routes/api/post/posts"));
app.use("/api/friendRequest", require("./routes/api/user/friendRequest"));

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server Started on ${PORT}`));
