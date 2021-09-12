const express = require("express");
const router = express.Router();
const Blog = require("../model/Blog");
const User = require("../model/User");

router.get("/", (req, res) => {
  return res.status(200).json("user")
});


router.post("/", async (req, res) => {
  try {
    console.log("create blog");
    const { userId, body } = req.body;
    const blog = new Blog({ userId, body });
    await blog.save();
    // Using upsert option (creates new doc if no match is found)

    let user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: {blogs: blog._id} },
      { new: true, setDefaultsOnInsert: true }
    );

    return res.status(200).json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/", async (req, res) => {
});

module.exports = router;