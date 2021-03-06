const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User"
    },
    blog: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Blog"
    },
    body: String
 })

 const Comment = mongoose.model("Comment", CommentSchema);

 module.exports =  Comment