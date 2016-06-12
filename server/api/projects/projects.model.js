'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title: {type: String, required: true},
  images: [String],
  description: {type: String},
  category:{type: String},
  cd: {type: Date, default: Date.now},
  lm: {type: Date, default: Date.now},
  viewsCount: {type: Number, default: 0},
  metadata:{
  	why: {type: String},
  	location: {type: String},
  	feature: {type: String},
  	ground: {type: String},
  	progress: {type: String},
  	payment: {type: String},
  	video: {type: String}
  }
});

module.exports = mongoose.model('News', NewsSchema);