const express = require('express')
const Tweet = require("../models/TweetModel")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const secret = "sjfsdhsbflkjbsvhfslkdhs"


const fs = require('fs')

const createTweet = async (req, res) => {
  try {
    const { originalname, path } = req.file
    const parts = originalname.split(".")
    const ext = parts[parts.length - 1]
    const newPath = path + "." + ext
    fs.renameSync(path, newPath)

    const { token } = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { tweet, likes, photo, postedBy } = req.body
      const postDoc = await Tweet.create({
        tweet,
        likes,
        photo: newPath,
        postedBy: info.id,
      })
      // console.log(postDoc)
      // res.json(postDoc, "success")
      res.status(200).json(postDoc)
    })
  } catch (err) {
    res.json(err)
  }
}


const showTweets = async (req, res) => {
  console.log(req.body.tweet);
  res.json(
    await Tweet.find()
      .populate('postedBy', ['imageURL', "username"])
      .sort({ createdAt: -1 })
    // .limit(20)
  )
}

const like = async (req, res) => {
  // console.log(req.id)
  console.log(req.body)
  const result = await Tweet.findByIdAndUpdate(
    req.body.tweetId,
    {
      $push: { likes: req.body.id}
    },
    { new: true }
  );

  if (result.error) {
    return res.status(422).json({ error: result.error });
  }

  res.json(result);
};

const unlike = async (req, res) => {
  // console.log(req.id)
  console.log(req.body)
  const result = await Tweet.findByIdAndUpdate(
    req.body.tweetId,
    {
      $pull: { likes: req.body.id}
    },
    { new: true }
  );

  if (result.error) {
    return res.status(422).json({ error: result.error });
  }

  res.json(result);
};



// const unlike = async (req,res) =>{
//   console.log(req.body)
//   Tweet.findByIdAndUpdate(req.body._id, {
//     $pull:{likes:req.info.id}
//   },{
//     new:true
//   }).exec((err, result)=>{
//     if(err){
//       return res.status(422).json({error:err})
//     }else{
//       res.json(result)
//     }
//   })
// }


module.exports = { createTweet, showTweets , like, unlike}
