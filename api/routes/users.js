const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");

// update user
router.put("/:id", async (req, res) => {
  try {
    // Check if the user exists
    const existingUser = await User.findById(req.params.id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.userId === req.params.id) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashedPassword;

      // Use findOneAndUpdate to ensure correct user is updated
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.json({ message: "Account has been successfully updated", user });
    } else {
      res.status(403).json({ message: "You can only update your own account" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  try {
    // Check if the user exists
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify user's identity

    if (user._id.toString() === req.params.id) {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "The user has been successfully deleted" });
    } else {
      res.status(403).json({ message: "You can only delete your own account" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// get user
router.get("/", async (req, res) => {
  const userID = req.query.userId;
  const username = req.query.username;
  try {
    const user = userID
      ? await User.findById(userID)
      : await User.findOne({ username: username });
    // Check if the user exists
    const { password, ...other } = user._doc;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(other);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//get friends
router.get("/friends/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// follow user

router.put("/:id/follow", async (req, res) => {
  const userId = req.params.id;
  const followerId = req.body.userId;

  if (userId !== followerId) {
    try {
      const user = await User.findById(userId);
      const currentUser = await User.findById(followerId);

      if (user && currentUser) {
        if (!user.followers.includes(followerId)) {
          await user.updateOne({ $push: { followers: followerId } });
          await currentUser.updateOne({ $push: { followings: userId } });
          res.json({ message: "User followed successfully" });
        } else {
          res.status(403).json("You already follow this user");
        }
      } else {
        res.status(404).json("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(403).json("You can't follow yourself");
  }
});
// unfollow
router.put("/:id/unfollow", async (req, res) => {
  const userId = req.params.id;
  const followerId = req.body.userId;

  if (userId !== followerId) {
    try {
      const user = await User.findById(userId);
      const currentUser = await User.findById(followerId);

      if (user && currentUser) {
        if (user.followers.includes(followerId)) {
          await user.updateOne({ $pull: { followers: followerId } });
          await currentUser.updateOne({ $pull: { followings: userId } });
          res.json({ message: "User unfollowed successfully" });
        } else {
          res.status(403).json("You don't follow this user");
        }
      } else {
        res.status(404).json("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(403).json("You can't unfollow yourself");
  }
});

module.exports = router;
