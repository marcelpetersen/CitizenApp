const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');

/* GET issues listing. */
router.get('/', function(req, res, next) {
  Issue.find().sort('name').exec(function(err, issues) {
    if (err) {
      return next(err);
    }
    res.send(issues);
  });
});

/* POST new issue */
router.post('/', function(req, res, next) {
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

/* GET issues listing */
router.get('/', function(req, res, next) {
  Issue.find().sort('createdAt').exec(function(err, issues) {
    if (err) {
      return next(err);
    }
    res.send(issues);
  });
});

/* GET issues listing from a specific user */
router.get('/', function(req, res, next) {
  let query = Issue.find();
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

/**
 * Middleware that loads the user corresponding to the ID in the URL path.
 * Responds with 404 Not Found if the ID is not valid or the user doesn't exist.
 */
function loadIssueFromParamsMiddleware(req, res, next) {

  const issueId = req.params.id;
  if (!ObjectId.isValid(issueId)) {
    return issueNotFound(res, issueId);
  }

  User.findById(req.params.id, function(err, issue) {
    if (err) {
      return next(err);
    } else if (!user) {
      return issueNotFound(res, issueId);
    }

    req.issue = issue;
    next();
  });
}

module.exports = router;
