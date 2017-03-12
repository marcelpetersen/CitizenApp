const express = require('express');
const router = express.Router();
const Issue = require('../models/issue');
const User = require('../models/user');
const utils = require('./utils');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/* POST new issue */
/**
* @api {post} /issues Create an issue
* @apiName CreateIssue
* @apiGroup Issue
* @apiVersion 1.0.0
* @apiDescription Registers a new issue.
*
* @apiUse IssueInRequestBody
* @apiUse IssueInResponseBody
* @apiUse IssueValidationError
* @apiSuccess (Response body) {String} id A unique identifier for the issue generated by the server
*
* @apiExample Example
*     POST /issues HTTP/1.1
*     Content-Type: application/json
*
*     {
*       "status": "new",
        "description": "grafiti sur le mur",
        "latitude": "265",
        "longitude": "25",
        "tags":["grafiti", "mur"],
        "user":"58b6cb1ce2a1de16edbc5a41"
*     }
*
* @apiSuccessExample 201 Created
*     HTTP/1.1 201 Created
*     Content-Type: application/json
*     Location: https://heigvd-webserv-2017-team-7.herokuapp.com/users/58b588145f392e0d34e16b44
*
*     {
*        ""status": "new",
        "description": "grafiti sur le mur",
        "latitude": "265",
        "longitude": "25",
        "tags":["grafiti", "mur"],
        "user":"58b6cb1ce2a1de16edbc5a41",
*        "createdAt": "2017-02-28T14:24:20.482Z",
*        "id": "58b588145f392e0d34e16b44"
*      }
*/
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


/**
* @api {get} /issues List issues
* @apiName RetrieveIssues
* @apiGroup Issue
* @apiVersion 1.0.0
* @apiDescription Retrieves a list of issues
*
* @apiUse IssueInResponseBody
*
* @apiExample Example
*     GET /issues HTTP/1.1
*
* @apiSuccessExample 200 OK
*     HTTP/1.1 200 OK
*     Content-Type: application/json
*
* [
*  {
*    "_id": "58b6cd77e2a1de16edbc5a44",
*    "description": "Graphiti sur le mur de l'église",
*    "latitude": 2,
*    "longitude": 42,
*    "__v": 0,
*    "createdAt": "2017-03-01T13:32:39.570Z",
*    "user": "58b6cb11e2a1de16edbc5a41",
*    "tags": [
*      "église",
*      "graphiti"
*    ],
*    "status": "new"
*  },
*  {
*    "_id": "58b6d82009bf0f18065d210f",
*    "description": "cailloux sur la route de la gare",
*    "latitude": 23,
*    "longitude": 285,
*    "__v": 0,
*    "createdAt": "2017-03-01T14:18:08.096Z",
*    "user": "58b6cb1ce2a1de16edbc5a41",
*    "tags": [
*      "cailloux",
*      "route",
*      "gare"
*    ],
*    "status": "new"
*  }
*]
*/
/**
*@api {get} /issues List issues filtered
* @apiName RetrieveIssuesFromSpecificUser
* @apiGroup Issue
* @apiVersion 1.0.0
* @apiDescription Retrieves a list of issues from a specific user
* @apiUse UserIdInUrlPath
* @apiUse IssueInResponseBody
* @apiUse IssueNotFoundError
*
@apiExample Example
*     GET /issues?user=58b6cb1ce2a1de16edbc5a41 HTTP/1.1
*
* @apiSuccessExample 200 OK
*     HTTP/1.1 200 OK
*     Content-Type: application/json
*
* [
*  {
*    "_id": "58b6d82009bf0f18065d210f",
*    "description": "cailloux sur la route de la gare",
*    "latitude": 23,
*    "longitude": 285,
*    "__v": 0,
*    "createdAt": "2017-03-01T14:18:08.096Z",
*    "user": "58b6cb1ce2a1de16edbc5a41",
*    "tags": [
*      "cailloux",
*      "route",
*      "gare"
*    ],
*    "status": "new"
*  }
*]
*/
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

/**
* @apiDefine IssueInRequestBody
* @apiParam (Request body) {String="new","inProgress","completed","canceled"} status The status of the issue
* @apiParam (Request body) {String{2..30}} description The description of the issue
* @apiParam (Request body) {String} imageUrl The image's URL of the issue
* @apiParam (Request body) {Number} latitude The latitude of the issue
* @apiParam (Request body) {Number} longitude The longitude of the issue
* @apiParam (Request body) {String[]} tags The tags of the issue
* @apiParam (Request body) {String} user The id of the user who create the issue
*/

/**
* @apiDefine IssueInResponseBody
* @apiSuccess (Response body) {String="new","inProgress","completed","canceled"} status The status of the issue
* @apiSuccess (Response body) {String} description The description of the issue
* @apiSuccess (Response body) {String} imageURL The description of the issue
* @apiSuccess (Response body) {Number} latitude The latitude of the issue
* @apiSuccess (Response body) {Number} longitude The longitude of the issue
* @apiSuccess (Response body) {String[]} tags The tags of the issue
* @apiSuccess (Response body) {String} user The id of the user who create the issue
* @apiSuccess (Response body) {String} createdAt The date at which the issue was created
* @apiSuccess (Response body) {String} id The unique identifier of the issue
*/

/**
* @apiDefine IssueIdInUrlPath
* @apiParam (URL path parameters) {String} id The unique identifier of the issue to retrieve
*/

/**
 * @apiDefine IssueNotFoundError
 *
 * @apiError {Object} 404/NotFound No issue was found corresponding to the ID in the URL path
 *
 * @apiErrorExample {json} 404 Not Found
 *     HTTP/1.1 404 Not Found
 *     Content-Type: text/plain
 *
 *     No issue with ID 58b6d82009bf0f18065d210f
 */

 /**
* @apiDefine UserIdInUrlPath
* @apiParam (URL path parameters) {String} id The unique identifier of the user to retrieve a filtered list by the user ID
*/

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError {Object} 404/NotFound No user was found corresponding to the ID in the URL path
 *
 * @apiErrorExample {json} 404 Not Found
 *     HTTP/1.1 404 Not Found
 *     Content-Type: text/plain
 *
 *     No user with ID 58b6cb1ce2a1de16edbc5a41
 */

/**
  * @apiDefine IssueValidationError
  *
  * @apiError {Object} 422/UnprocessableEntity Some of the issue's properties are invalid
  *
  *
  * @apiErrorExample {json} 422 Unprocessable Entity
  *     HTTP/1.1 422 Unprocessable Entity
  *     Content-Type: application/json
  *
  *     {
  *       "message": "Issue validation failed",
  *       "errors": {
  *         "status": {
  *           "message": "Path `status` is required.",
  *           "name": "ValidatorError",
  *           "properties": {
  *             "type": "required",
  *             "message": "Path `{PATH}` is required.",
  *             "path": "status"
  *           },
  *           "kind": "required",
  *           "path": "status"
  *         },
  *         "description": {
  *           "message": "Path `description` is required.",
  *           "name": "ValidatorError",
  *           "properties": {
  *             "type": "required",
  *             "message": "Path `{PATH}` is required.",
  *             "path": "description"
  *           },
  *           "kind": "required",
  *           "path": "description"
  *         },
  *         "imageUrl": {
  *           "message": "Path `imageUrl` must be a String.",
  *           "name": "ValidatorError",
  *           "properties": {
  *             "type": "String",
  *             "message": "Path `{PATH}` must be a String.",
  *             "path": "imageUrl"
  *           }
  *         },
  *         "latitude": {
  *           "message": "Path `latitude` is required.",
  *           "name": "ValidatorError",
  *           "properties": {
  *             "type": "required",
  *             "message": "Path `{PATH}` is required.",
  *             "path": "latitude"
  *           },
  *           "kind": "required",
  *           "path": "latitude"
  *         },
  *         "longitude": {
  *           "message": "Path `longitude` is required.",
  *           "name": "ValidatorError",
  *           "properties": {
  *             "type": "required",
  *             "message": "Path `{PATH}` is required.",
  *             "path": "longitude"
  *           },
  *           "kind": "required",
  *           "path": "longitude"
  *         },

  *       }
  *     }
  *
  */


module.exports = router;
