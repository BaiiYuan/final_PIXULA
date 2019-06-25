const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  account: String,
  password: String,
});


const projectSchema = new Schema({
  author: String,
  title: String,
  description: String,
  imageOriginal: String,
  imageTransfer: String,
  imageFinal: String,
  blur: String,
  brightness: String,
  contrast: String,
  grayscale: String,
  hue_rotate: String,
  invert: String,
  opacity: String,
  saturate: String,
  sepia: String,
  public: Boolean,
  date: String
})

const User = mongoose.model('user', userSchema);
const Project = mongoose.model('project', projectSchema);

module.exports = {
  User,
  Project
};