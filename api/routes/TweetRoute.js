const express = require('express')
const router = express.Router()
const Tweet = require("../models/TweetModel")
const { createTweet, showTweets, like, unlike } = require('../controllers/TweetControl')
const multer = require('multer')
const uploadMiddleware = multer({ dest: 'uploads/' })

router.post("/tweet", uploadMiddleware.single('file'), createTweet )
router.get("/tweet/home", showTweets )
router.put("/tweet/like", like )
router.put("/tweet/unlike", unlike )


module.exports = router
