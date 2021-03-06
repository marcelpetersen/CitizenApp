const express = require('express');
const router = express.Router();
const config = require('../config');
const User = require('../models/user');
const utils = require('./utils');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

/**
* @api {post} /users Create a user
* @apiName CreateUser
* @apiGroup User
* @apiVersion 1.0.0
* @apiDescription Registers a new user.
*
* @apiUse UserInRequestBody
* @apiUse UserInResponseBody
* @apiUse UserValidationError
* @apiSuccess (Response body) {String} id A unique identifier for the user generated by the server
*
* @apiExample Example
*     POST /users HTTP/1.1
*     Content-Type: application/json
*
*     {
*       "firstName": "Adrien",
*       "lastName": "Savoretti",
*       "role": "manager"
*     }
*
* @apiSuccessExample 201 Created
*     HTTP/1.1 201 Created
*     Content-Type: application/json
*     Location: https://heigvd-webserv-2017-team-7.herokuapp.com/users/58b588145f392e0d34e16b44
*
*     {
*        "firstName": "Adrien",
*        "lastName": "Savoretti",
*        "role": "manager",
*        "createdAt": "2017-02-28T14:24:20.482Z",
*        "id": "58b588145f392e0d34e16b44"
*      }
*/
router.post('/', utils.requireJson, function(req, res, next) {
  // Create a new document from the JSON in the request body
  const newUser = new User(req.body);

  // Save that document
  newUser.save(function(err, savedUser) {
    if (err) {
      return next(err);
    }

    res
    .status(201)
    .set('Location', `${config.baseUrl}/users/${savedUser._id}`)
    .send(savedUser);
  });
});

/**
* @api {get} /users List users
* @apiName RetrieveUsers
* @apiGroup User
* @apiVersion 1.0.0
* @apiDescription Retrieves a list of users
*
* @apiUse UserInResponseBody
*
* @apiExample Example
*     GET /users HTTP/1.1
*
* @apiSuccessExample 200 OK
*     HTTP/1.1 200 OK
*     Content-Type: application/json
*
* [
*   {
*     "firstName": "Adrien",
*     "lastName": "Savoretti",
*     "role": "manager",
*     "createdAt": "2017-02-28T14:24:20.482Z",
*     "id": "58b588145f392e0d34e16b44"
*   },
*   {
*     "firstName": "Cristian",
*     "lastName": "Esparis",
*     "role": "manager",
*     "createdAt": "2017-02-28T14:27:48.875Z",
*     "id": "58b588e481182b3110082ccc"
*   }
* ]
*/
router.get('/', function(req, res, next) {
  User.find().sort('firstName').exec(function(err, users) {
    if (err) {
      return next(err);
    }
    res.send(users);
  });
});

/**
 * @api {get} /users/:id Retrieve a user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Retrieves one user.
 *
 * @apiUse UserIdInUrlPath
 * @apiUse UserInResponseBody
 * @apiUse UserNotFoundError
 *
 * @apiExample Example
 *     GET /users/58b588145f392e0d34e16b44 HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *     {
 *        "firstName": "Adrien",
 *        "lastName": "Savoretti",
 *        "role": "manager",
 *        "createdAt": "2017-02-28T14:24:20.482Z",
 *        "id": "58b588145f392e0d34e16b44"
 *      }
 */
router.get('/:id', loadUserFromParamsMiddleware, function(req, res, next) {
  res.send(req.user);
});

/**
 * @api {patch} /users/:id Partially update a user
 * @apiName PartiallyUpdateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Partially updates a user's data (only the properties found in the request body will be updated).
 * All properties are optional.
 *
 * @apiUse UserIdInUrlPath
 * @apiUse UserInRequestBody
 * @apiUse UserInResponseBody
 * @apiUse UserNotFoundError
 * @apiUse UserValidationError
 *
 * @apiExample Example
 *     PATCH /users/58b588145f392e0d34e16b44 HTTP/1.1
 *     Content-Type: application/json
 *
 *     {
 *       "role": "citizen"
 *     }
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *     {
 *        "firstName": "Adrien",
 *        "lastName": "Savoretti",
 *        "role": "citizen",
 *        "createdAt": "2017-02-28T14:24:20.482Z",
 *        "id": "58b588145f392e0d34e16b44"
 *      }
 */
router.patch('/:id', utils.requireJson, loadUserFromParamsMiddleware, function(req, res, next) {

  // Update only properties present in the request body
  if (req.body.firstName !== undefined) {
    req.user.firstName = req.body.firstName;
  }
  if (req.body.lastName !== undefined) {
    req.user.lastName = req.body.lastName;
  }
  if (req.body.role !== undefined) {
    req.user.role = req.body.role;
  }

  req.user.save(function(err, savedUser) {
    if (err) {
      return next(err);
    }

    res.send(savedUser);
  });
});

/**
* Middleware that loads the user corresponding to the ID in the URL path.
* Responds with 404 Not Found if the ID is not valid or the user doesn't exist.
*/
function loadUserFromParamsMiddleware(req, res, next) {

  const userId = req.params.id;
  if (!ObjectId.isValid(userId)) {
    return userNotFound(res, userId);
  }

  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return userNotFound(res, userId);
    }

    req.user = user;
    next();
  });
}

/**
 * Responds with 404 Not Found and a message indicating that the user with the specified ID was not found.
 */
function userNotFound(res, userId) {
  return res.status(404).type('text').send(`No user found with ID ${userId}`);
}

/**
* @apiDefine UserInRequestBody
* @apiParam (Request body) {String{2..20}} firstName The first name of the user
* @apiParam (Request body) {String{2..20}} lastName The last name of the user
* @apiParam (Request body) {String} role The role of the user
*/

/**
* @apiDefine UserInResponseBody
* @apiSuccess (Response body) {String} firstName The first name of the user
* @apiSuccess (Response body) {String} lastName The last name of the user
* @apiSuccess (Response body) {String} role The role of the user
* @apiSuccess (Response body) {String} createdAt The date at which the user was created
* @apiSuccess (Response body) {String} id The unique identifier of the user
*/

/**
* @apiDefine UserIdInUrlPath
* @apiParam (URL path parameters) {String} id The unique identifier of the user to retrieve
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
 *     No movie user with ID 58b588144f392e0d34e16b44
 */

 /**
  * @apiDefine UserValidationError
  *
  * @apiError {Object} 422/UnprocessableEntity Some of the user's properties are invalid
  *
  *
  * @apiErrorExample {json} 422 Unprocessable Entity
  *     HTTP/1.1 422 Unprocessable Entity
  *     Content-Type: application/json
  *
  *     {
  *       "message": "User validation failed",
  *       "errors": {
  *         "role": {
  *           "message": "Path `role` is required.",
  *           "name": "ValidatorError",
  *           "properties": {
  *             "type": "required",
  *             "message": "Path `{PATH}` is required.",
  *             "path": "role"
  *           },
  *           "kind": "required",
  *           "path": "role"
  *         },
  *         "lastName": {
  *           "message": "Path `lastName` is required.",
  *           "name": "ValidatorError",
  *           "properties": {
  *             "type": "required",
  *             "message": "Path `{PATH}` is required.",
  *             "path": "lastName"
  *           },
  *           "kind": "required",
  *           "path": "lastName"
  *         },
  *         "firstName": {
  *           "message": "Path `firstName` (`J`) is shorter than the minimum allowed length (2).",
  *           "name": "ValidatorError",
  *           "properties": {
  *             "minlength": 2,
  *             "type": "minlength",
  *             "message": "Path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length (2).",
  *             "path": "firstName",
  *             "value": "J"
  *           },
  *           "kind": "minlength",
  *           "path": "firstName",
  *           "value": "J"
  *         }
  *       }
  *     }
  *
  */

module.exports = router;
