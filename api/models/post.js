const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  relies:[{
    user:{
      type: mongoose.Schema.Types.ObjectId, ref:"User"
    },
    content:{
      type:String,
      require: true,
    },
    createAt:{
      type: Date,
      default: Date.now,
    },
  },],
  createAt:{
    type:Date,
    default: Date.now
  }
});

const Post = mongoose.model("Post",PostSchema);

module.exports = Post;
