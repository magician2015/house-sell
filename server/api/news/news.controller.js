/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var News = require('./news.model');

// Get list of news
exports.index = function(req, res) {
  var sort = {};
  req.query.sort = req.query.sort || "-lm";
  if(req.query.sort[0] == "-"){
    sort[req.query.sort.substr(1)] = -1;
  }else{
    sort[req.query.sort.substr(1)] = 1;
  }

  News.find().sort(sort).limit(6).exec().then(function(news){
  	return res.status(200).json({news: news});
  }, function(err){
  	return handleError(res, err); 
  })
};

// Get a single news
exports.show = function(req, res) {
  News.findById(req.params.id).exec().then(function (news) {
    if(!news) { return res.status(404).send('Not Found'); }
    return res.json({news: news});
  }, function(err){
  	return handleError(res, err);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  News.create(req.body, function(err, news) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(news);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  News.findById(req.params.id, function (err, news) {
    if (err) { return handleError(res, err); }
    if(!news) { return res.status(404).send('Not Found'); }
    var updated = _.merge(news, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(news);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  News.findById(req.params.id, function (err, news) {
    if(err) { return handleError(res, err); }
    if(!news) { return res.status(404).send('Not Found'); }
    news.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send({error: err});
}