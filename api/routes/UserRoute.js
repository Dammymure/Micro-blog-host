const express = require('express')
const router = express.Router()
// const User = require("../models/UserModel")
const { createTweet, createUser, loginUser, logOut, profile, getOneUser } = require('../controllers/UserControl')
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })

// Routes for post operations
router.post("/create/user", createUser)
router.post("/user/login", loginUser)
router.post("/user/logout", logOut)
router.get("/user/profile", profile)
router.get("/create/user/:id", getOneUser)
router.post("/tweet", uploadMiddleware.single('file'), createTweet)

module.exports = router
