const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../../middleware/auth");
const Post = require("../../../models/Posts/Post");
const Profile = require("../../../models/User/UserProfile");
const User = require("../../../models/User/User");
const { remove } = require("../../../models/Posts/Post");
const checkObjectId = require("../../../middleware/checkObjectId");
const paginatedResults = require("../../../middleware/pagination");

//@route    POST api/posts
//@desc     Create a post
//@access   Private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await User.findById(req.user.id).select("-password"); //req.user.id has the token needed.
    try {
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    GET api/posts
//@desc     Get a post
//@access   Private

//We pass in the Model and the query to the paginatedResult Middleware and it does the job for us. This allows us to pass complex queries.

const postquery = Post.find().sort({ _id: -1 });

router.get("/", paginatedResults(Post,postquery), async (req, res) => {
  try {
    res.json(res.paginatedResults);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route    GET api/posts/user/:id
//@desc     Get a user's post
//@access   Private

router.get("/user/:id", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id }).sort({
      _id: -1,
    });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route    GET api/posts/:id
//@desc     Get a post by ID
//@access   Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    } else {
      res.status(500).send("Server Error");
    }
  }
});
//@route    DELETE api/posts/:id
//@desc     Delete a post
//@access   Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    //Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    } else {
      await post.remove();
      res.json({ msg: "Post removed" });
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    } else {
      res.status(500).send("Server Error");
    }
  }
});

//@route    PUT api/posts/like/:id
//@desc     Like a post
//@access   Private
router.put("/like/:id", [auth, checkObjectId("id")], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
//@route    PUT api/posts/unlike/:id
//@desc     Unlike a post
//@access   Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //Check if the post has already been liked by this user.
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    } else {
      //Get remove index
      const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);
      await post.save();
      res.json(post.likes);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/post/comment/:id
//@desc     Comment on a post
//@access   Private

router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
        likes: [],
      };

      post.comments.unshift(newComment);

      await post.save();
      console.log(post.comments);
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route    DELETE api/post/comment/:id/:comment_id
//@desc     Delete comment
//@access   Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    //Pull out the comment
    const comment = posts.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    //Make sure comment exists.
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    //Check user
    if (comment.user.id.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    //Find the index of the comment.
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
