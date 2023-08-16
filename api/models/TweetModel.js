const mongoose = require('mongoose')
const { Schema, model } = mongoose



const TweetSchema = new mongoose.Schema({
 tweet: {
  type: String,
  required: [true, "Please enter tweet"]
 },
 photo: {
  type: String,
  // required:false
 },
 postedBy:{ 
  type:Schema.Types.ObjectId,
  ref:"User"
 },
 likes: [{ type: Schema.Types.ObjectId, ref:"User" }]
},
 {
  timestamps: true,
 }
)

const TweetModel = model("Tweet", TweetSchema)
module.exports = TweetModel