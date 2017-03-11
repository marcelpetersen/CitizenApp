const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');
const User = require('../models/user');
const utils = require('./utils');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/* POST new issue */
router.post('/', utils.requireJson, function(req, res, next) {
  // Create a new document from the JSON in the request body
  const newIssue = new Issue(req.body);
  // Save that document
  newIssue.save(function(err, savedIssue) {
    if (err) {
      return next(err);
    }
    // Send the saved document in the response
    res.send(savedIssue);
  });
});

/* GET issues listing from a specific user */
router.get('/', function(req, res, next) {
  let query = Issue.find().sort('createdAt');
  // Filter by user
  if (ObjectId.isValid(req.query.user)) {
    query = query.where('user').equals(req.query.user);
  }
  // Execute the query
  query.exec(function(err, issues) {
    if (err) {
      return next(err);
    }
    res.send(issues);
  });
});

/* GET a specific issue */
router.get('/:id', loadIssueFromParamsMiddleware, function(req, res, next) {
  res.send(req.issue);
});

/* PATCH modification d'une issue */
router.patch('/:id', utils.requireJson, loadIssueFromParamsMiddleware, function(req, res, next) {
  if (req.body.status !== undefined){
    if (req.issue.status == 'new' & req.body.status == 'inProgress'){
      req.issue.status = req.body.status;
    }
    if (req.issue.status == 'new' & req.body.status == 'canceled'){
      req.issue.status = req.body.status;
    }
    if (req.issue.status == 'inProgress' & req.body.status == 'completed'){
      req.issue.status = req.body.status;
    }
  }
  if (req.body.description !== undefined){
    req.issue.description = req.body.description;
  }
  if (req.body.imageUrl !== undefined){
    req.issue.imageUrl = req.body.imageUrl;
  }
  if (req.body.latitude !== undefined){
    req.issue.latitude = req.body.latitude;
  }
  if (req.body.longitude !== undefined){
    req.issue.longitude = req.body.longitude;
  }
  if (req.body.tags !== undefined){
    req.issue.tags = req.body.tags;
  }

  req.issue.updatedAt = Date.now();

  req.issue.save(function(err, savedIssue){
    if(err){
      return next(err);
    }

    debug('Update issue "${savedIssue}"');
    res.send(savedIssue);
  });
});

/* DELETE a specific issue */
router.delete('/:id', loadIssueFromParamsMiddleware, function(req, res, next) {
  req.issue.remove(function(err) {
    if (err) {
      return next(err);
    }

    res.sendStatus(204);
  });
});


/**
 * Middleware that loads the issue corresponding to the ID in the URL path.
 * Responds with 404 Not Found if the ID is not valid or the issue doesn't exist.
 */
function loadIssueFromParamsMiddleware(req, res, next) {

  const issueId = req.params.id;
  if (!ObjectId.isValid(issueId)) {
    return issueNotFound(res, issueId);
  }

  Issue.findById(req.params.id, function(err, issue) {
    if (err) {
      return next(err);
    }
    else if (!issue) {
      return issueNotFound(res, issueId);
    }

    req.issue = issue;
    next();
  });
}

/**
 * Responds with 404 Not Found and a message indicating that the issue with the specified ID was not found.
 */
function issueNotFound(res, issueId) {
  return res.status(404).type('text').send(`No issue found with ID ${issueId}`);
}




module.exports = router;
