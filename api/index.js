const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require("dotenv")
dotenv.config()

const userRouter = require("./routes/UserRoute")
const tweetRouter = require("./routes/TweetRoute")
const bodyParser = require('body-parser');

// app.use(cors({ credentials: true}))
const corsOptions = {
 origin: /^http:\/\/localhost(:\d+)?$/,
 credentials: true,
};
// app.use(cors())

app.use(cors(corsOptions));

app.use('/uploads', express.static(__dirname + '/uploads'))

// Connect server to database
mongoose.connect(process.env.MONGO_URI)
 .then(() => {
  console.log("Database is connected successfully");
 })
 .catch((err) => {
  console.log(err);
 })

// Configure body-parser middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// middlewae for post http model
app.use(express.json())
app.use(cookieParser())

app.use("/api", userRouter)
app.use("/api", tweetRouter)


// app.listen(process.env.API_PORT, () => {
//  console.log(`Server running on port ${PORT}`);
// })

if (process.env.API_PORT) {
 app.listen(process.env.API_PORT, () => {
  console.log(`Server running on port ${process.env.API_PORT}`);
 })
}

module.exports = app