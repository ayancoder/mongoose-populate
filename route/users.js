const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const User = require("../model/User");

router.get("/:userId", (req, res) => {
  console.log("user id:",req.params.userId+":end");
  /* User.findOne({'_id': ObjectId(req.params.userId.trim())})
   .populate("blogs") // key to populate
   .then(user => {
      res.json(user); 
   });
 */

   User.findOne({ _id: ObjectId(req.params.userId.trim()) })
     .populate({
       path: "blogs", // populate blogs
       populate: {
         path: "comments", // in blogs, populate comments
         select: { body: 1 }
       },
     })
     .then((user) => {
       res.json(user);
     });
});

router.post("/", async (req, res) => {
  try {
    console.log("user post");
    const { name, email } = req.body;
    const user = new User({ name, email });
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;