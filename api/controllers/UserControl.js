const express = require('express')
const User = require("../models/UserModel")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const secret = "sjfsdhsbflkjbsvhfslkdhs"
const Tweet = require("../models/TweetModel")

const fs = require('fs');


const createUser = async (req, res) => {
 try {
  const { username, email, password, imageURL } = req.body
  // To check if the input already exists using unique email
  const existingUser = await User.findOne({ username: username })
  // if it exists give error
  if (existingUser) {
   console.log("User already exists");
   return res.json({ msg: "User already exists", existingUser })
  } else {

  }

  // If it doesnt exist create user 
  const createdUser = await User.create({
   username,
   email,
   password,
   imageURL
  })
  res.status(200).json({
   id: createdUser._id,
   username: createdUser.username,
   email: createdUser.email,
   password: createdUser.password,
   imageURL: createdUser.imageURL,
   msg: "User created successfully"
  })

  console.log(createdUser);
 }
 catch (err) {
  res.send(err)
 }
}

// Login User
const loginUser = async (req, res) => {
 try {
  const { username, password } = req.body
  const existingUser = await User.findOne({ username: username })
  if (existingUser && (await existingUser.isPasswordMatch(password))) {
   jwt.sign({ username, id: existingUser._id }, secret, {}, (err, token) => {
    console.log(token);
    // localStorage.setItem("token", token)
    if (err) throw err;

    return res.cookie('token', token).json({
     _id: existingUser._id,
     username: existingUser.username,
     email: existingUser.email,
     imageURL: existingUser.imageURL,
     msg: "You have successfully logged IN",
     token: token
    })
     .res.headers.authorization({ token: token });
   });

  }
  else {
   res.json({ msg: 'Invalid credentials' })
  }

 }
 catch (err) {

 }
}

const createTweet = async (req, res) => {
 try {
  const { originalname, path } = req.file
  const parts = originalname.split(".")
  const ext = parts[parts.length - 1]
  const newPath = path + "." + ext
  fs.renameSync(path, newPath)

  // const tokenZero = req.cookies
  // const token = req.cookies;
  // const token = Object.assign({}, req.cookies)

  const token = req.cookies.token
  // const token = JSON.stringify(req.cookies.token);
  // const token = tokenData.token;
  // const token = req.headers;
  // const token = req.headers.authorization
  console.log(token);
  jwt.verify(token, secret, {}, async (err, info) => {
   if (err) throw err;
   console.log(info);
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
   console.log(postDoc);
  })
 } catch (err) {
  res.json(err)
  console.log("Error");
 }
}


// const profile = (req, res) => {
//  const { token } = req.cookies;
//  jwt.verify(token, secret, {}, (err, info) => {
//   if (err) throw err;
//   res.json(info);
//   localStorage.setItem("token", token)
//  });
// }

// const profile = (req, res) => {
//  // const token = req.cookies;
//  const token = req.cookies.token
//  // const token = req.body.token
//  console.log(token);
//  jwt.verify(token, secret, {}, (err, info) => {
//   if (err) throw err;
//   res.json({ info, token }); // Include the token in the response
//  });
// };
const profile = (req, res) => {
 // const token = req.cookies;
 const token = req.cookies.token
 // const token = req.body.token
 console.log(token);
 jwt.verify(token, secret, {}, (err, info) => {
  if (err) throw err;
  res.json({ info, token }); // Include the token in the response
 });
};

// const logOut = (req, res) => {
//  res.cookie("token", "").json("Ok")
//  localStorage.removeItem("token")
// }

const logOut = (req, res) => {
 res.clearCookie("token").json("Ok"); // Clear the token cookie
 // localStorage.removeItem("token");    
 // Remove from local storage
}

// Fetch single user
const getOneUser = async (req, res) => {
 const { id } = req.params
 console.log(id);
 try {
  const getSingleUser = await User.findById(id)
  // console.log(getSingleUser);
  res.status(200).json(getSingleUser)
 } catch (err) {
  res.send(err)
 }
}

module.exports = { createTweet, createUser, loginUser, logOut, profile, getOneUser }
