const express = require('express')
const User = require("../models/UserModel")
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const secret = "sjfsdhsbflkjbsvhfslkdhs"


const createUser = async (req, res) => {
 try {
  const { username, email, password, imageURL } = req.body
  // To check if the input already exists using unique email
  const existingUser = await User.findOne({ username: username })
  // if it exists give error
  if (existingUser) {
   console.log("User already exists");
   return res.json({ msg: "User already exists", existingUser })
  }else{

  }

  // If it doesnt exist create user 
  const createdUser = await User.create({ 
   username, 
   email, 
   password, 
   imageURL})
  res.status(200).json({
   id:createdUser._id,
   username: createdUser.username,
   email: createdUser.email,
   password: createdUser.password,
   imageURL: createdUser.imageURL,
   msg:"User created successfully"
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
    if (err) throw err;

    // const user = {
    //  _id: existingUser._id,
    //  username: existingUser.username,
    //  email: existingUser.email,
    //  imageURL: existingUser.imageURL,
    //  msg: "You have successfully logged IN",
    // }
    // user.save()
    return res.cookie('token', token).json({
     _id: existingUser._id,
     username: existingUser.username,
     email: existingUser.email,
     imageURL: existingUser.imageURL,
     msg: "You have successfully logged IN",
     token: token
    });
    
   });

  }
  else {
   res.json({ msg: 'Invalid credentials' })
  }

 }
 catch (err) {

 }
}

const profile = (req, res) => {
 const { token } = req.cookies;
 jwt.verify(token, secret, {}, (err, info) => {
  if (err) throw err;
  res.json(info);
 });
}

const logOut = (req, res) => {
 res.cookie("token", "").json("Ok")
 localStorage.removeItem("token")
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

module.exports = { createUser, loginUser, logOut, profile, getOneUser }
