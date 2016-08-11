'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostsSchema = new Schema({
  title: {type: String, required: true},
  images: String,
  description: {type: String},
  category:{type: String},
  cd: {type: Date, default: Date.now},
  lm: {type: Date, default: Date.now},
  viewsCount: {type: Number, default: 0},
  content: {type: String, required: true},
  comments: [{
    name: String,
    email: String,
    phone: String,
    message: String
  }]
});

module.exports = mongoose.model('Posts', PostsSchema);