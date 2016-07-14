'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Subscriber = new Schema({
  email: String,
  phone: String,
  project: {
  	id: {type: Schema.Types.ObjectId}, 
  	name: String
  }
});

module.exports = mongoose.model('Subscriber', Subscriber);