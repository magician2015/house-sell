'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var NewsSchema = new Schema({
  title: {type: String, required: true},
  images: [String],
  description: {type: String},
  cd: {type: Date, default: Date.now},
  lm: {type: Date, default: Date.now},
  viewsCount: {type: Number, default: 0}
});

module.exports = mongoose.model('News', NewsSchema);