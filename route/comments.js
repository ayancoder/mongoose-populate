const express = require("express");
const router = express.Router();
const User = require("../model/User");
const Blog = require("../model/Blog");
const Comment = require("../model/Comment");

router.get("/", (req, res) => {
  return res.status(200).json("user")
});


router.post("/", async (req, res) => {

  try {
    console.log("create comment");
    const { userId, blogId, body } = req.body;
    let newComment = new Comment({
      user: userId,
      blog: blogId,
      body: body,
    });

    await newComment.save().then((result) => {
      Comment.populate(newComment, { path: "user" }).then((comment) => {
        res.status(200).json({
          message: "Comment added",
          comment,
        });
      });
    });

    // Using upsert option (creates new doc if no match is found)
    await Blog.findOneAndUpdate(
      { _id: blogId },
      { $push: { comments: newComment._id } },
      { new: true, setDefaultsOnInsert: true }
    );

    return res;
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }

});

module.exports = router;