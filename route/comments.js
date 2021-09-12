const express = require("express");
const router = express.Router();
const Blog = require("../model/Blog");
const Comment = require("../model/Comment");

router.get("/", (req, res) => {
  return res.status(200).json("user")
});


router.post("/", async (req, res) => {

  try {
    console.log("create comment");
    const { user, blog, body } = req.body;
    const comment = new Comment({ user, blog, body });
    await comment.save();
    // Using upsert option (creates new doc if no match is found)
     await Blog.findOneAndUpdate(
      { _id: blog },
      { $push: {comments: comment._id} },
      { new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json(comment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }

});

module.exports = router;