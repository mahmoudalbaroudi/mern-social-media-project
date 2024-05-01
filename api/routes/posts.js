const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/Users");
const Comment = require("../models/Comment");
// create post

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    res.send(500).json(error);
  }
});

// updat post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({
        $set: {
          desc: req.body.desc,
          img: req.body.img,
        },
      });
      res.status(200).json("The post has been updated");
    } else {
      res.status(403).json("You can only update your own post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
// delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId === req.body.userId) {
      await Post.findByIdAndDelete(req.params.id);
      res.json({
        message: "Post has been successfully deleted",
      });
    } else {
      res.status(403).json("You can delete only your post");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// like post
router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(req.body.userId)) {
      await Post.findByIdAndUpdate(req.params.id, {
        $push: { likes: req.body.userId },
      });
      res.json({
        message: "Post has been successfully liked",
      });
    } else {
      await Post.findByIdAndUpdate(req.params.id, {
        $pull: { likes: req.body.userId },
      });
      res.json({
        message: "Post has been successfully unliked",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    // Handle database query errors or other unexpected errors
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    // Retrieve the current user based on the user ID from the request body
    const currentUser = await User.findById(req.params.userId);

    // Find posts created by the current user
    const userPosts = await Post.find({ userId: currentUser._id });

    // Retrieve posts created by the current user's friends
    const friendPosts = await Promise.all(
      // Map over the current user's followings array
      currentUser.followings.map((friendId) => {
        // For each friend ID, find posts created by that friend
        return Post.find({ userId: friendId });
      })
    );

    // Concatenate the user's posts and friend's posts into a single array
    const allPosts = userPosts.concat(...friendPosts);

    // Send the concatenated array of posts as the response
    res.json(allPosts);
  } catch (error) {
    // If an error occurs during the process, handle it
    console.log(error);
    res.status(500).json(error);
  }
});
// get user's all  posts

router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/:id/comments", async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id/comments/:commentId", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (comment.userId === req.body.userId) {
      await comment.deleteOne();
      res.status(200).json("The comment has been deleted");
    } else {
      res.status(403).json("You can only delete your own comments");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
