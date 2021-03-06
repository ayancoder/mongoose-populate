const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: String,
  user: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "User"
  },
  body: String,
  comments: [{
     type: mongoose.Schema.Types.ObjectId,
     ref: "Comment"
  }]
})

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog