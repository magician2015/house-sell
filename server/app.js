/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

var db = mongoose.connection;
db.on('connecting', function() {
    console.log('connecting to MongoDB...');
});

db.on('error', function(error) {
	mongoose.disconnect();
	console.error('MongoDB connection error: ' + error);
	// mongoose.connect(config.mongo.uri, config.mongo.options);
	process.exit(-1);
});
db.on('connected', function() {
	console.log('MongoDB connected!');
});
db.on('reconnected', function () {
	console.log('MongoDB reconnected!');
});
db.on('disconnected', function() {
	console.log('MongoDB disconnected!');
	mongoose.connect(config.mongo.uri, config.mongo.options);
});

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
