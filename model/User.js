const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   name: String,
   email: String,
   blogs: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
   }]
});

const User = mongoose.model("Author", UserSchema);
module.exports = User

