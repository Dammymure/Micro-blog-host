const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")




const userSchema = new mongoose.Schema({
 username: {
  type: String,
  required: [true, "Please enter fullname"]
 },
 email: {
  type: String,
  required: [true, "Please enter email"]
 },
 password: {
  type: String,
  required: [true, "Please enter password"]
 },
 imageURL: {
  type: String,
  required: [true, "Please enter photo"]
 }
},
 {
  timestamps: true,
 }
)

// Hashing of password
userSchema.pre("save", async function (next) {
 const salt = await bcrypt.genSalt(10)
 this.password = await bcrypt.hash(this.password, salt)
 next()
})

// Verify password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
 return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)
module.exports = User