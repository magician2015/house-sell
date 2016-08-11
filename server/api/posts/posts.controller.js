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
var Posts = require('./posts.model');

// Get list of posts
exports.index = function(req, res) {
  //get sort or limit options
  var sort = {};
  if(req.query.sort){
    if(req.query.sort[0] == "-"){
      sort[req.query.sort.substr(1)] = -1;
    }else{
      sort[req.query.sort.substr(1)] = 1;
    }
  }
  sort.lm = -1;

  //get category filter
  var query = {};

  var findQuery = Posts.find(query).sort(sort);
  if(req.query.limit){
    findQuery = findQuery.limit(parseInt(req.query.limit));
  }

  findQuery.exec().then(function(posts){
  	return res.status(200).json({posts: posts});
  }, function(err){
  	return handleError(res, err); 
  })
};

// Get a single news
exports.show = function(req, res) {
  Posts.findById(req.params.id).exec().then(function (post) {
    if(!post) { return res.status(404).send('Not Found'); }
    post.viewsCount += 1;
    post.save();
    res.json({post: post});
  }, function(err){
  	return handleError(res, err);
  });
};

// Creates a new thing in the DB.
exports.create = function(req, res) {
  Posts.create(req.body, function(err, posts) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(posts);
  });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Posts.findById(req.params.id, function (err, posts) {
    if (err) { return handleError(res, err); }
    if(!posts) { return res.status(404).send('Not Found'); }
    var updated = _.merge(posts, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(posts);
    });
  });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
  Posts.findById(req.params.id, function (err, posts) {
    if(err) { return handleError(res, err); }
    if(!posts) { return res.status(404).send('Not Found'); }
    posts.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send({error: err});
}