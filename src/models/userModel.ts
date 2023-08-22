import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password']
  }
})

const User = mongoose.models.users || mongoose.model('users', UserSchema)

export default User
