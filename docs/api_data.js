define({ "api": [  {    "type": "post",    "url": "/issues",    "title": "Create an issue",    "name": "CreateIssue",    "group": "Issue",    "version": "1.0.0",    "description": "<p>Registers a new issue.</p>",    "success": {      "fields": {        "Response body": [          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>A unique identifier for the issue generated by the server</p>"          },          {            "group": "Response body",            "type": "String",            "allowedValues": [              "\"new\"",              "\"inProgress\"",              "\"completed\"",              "\"canceled\""            ],            "optional": false,            "field": "status",            "description": "<p>The status of the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>The description of the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "imageURL",            "description": "<p>The description of the issue</p>"          },          {            "group": "Response body",            "type": "Number",            "optional": false,            "field": "latitude",            "description": "<p>The latitude of the issue</p>"          },          {            "group": "Response body",            "type": "Number",            "optional": false,            "field": "longitude",            "description": "<p>The longitude of the issue</p>"          },          {            "group": "Response body",            "type": "String[]",            "optional": false,            "field": "tags",            "description": "<p>The tags of the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "user",            "description": "<p>The id of the user who create the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "createdAt",            "description": "<p>The date at which the issue was created</p>"          }        ]      },      "examples": [        {          "title": "201 Created",          "content": "HTTP/1.1 201 Created\nContent-Type: application/json\nLocation: https://heigvd-webserv-2017-team-7.herokuapp.com/users/58b588145f392e0d34e16b44\n\n{\n   \"\"status\": \"new\",\n    \"description\": \"grafiti sur le mur\",\n    \"latitude\": \"265\",\n    \"longitude\": \"25\",\n    \"tags\":[\"grafiti\", \"mur\"],\n    \"user\":\"58b6cb1ce2a1de16edbc5a41\",\n   \"createdAt\": \"2017-02-28T14:24:20.482Z\",\n   \"id\": \"58b588145f392e0d34e16b44\"\n }",          "type": "json"        }      ]    },    "examples": [      {        "title": "Example",        "content": "POST /issues HTTP/1.1\nContent-Type: application/json\n\n{\n  \"status\": \"new\",\n    \"description\": \"grafiti sur le mur\",\n    \"latitude\": \"265\",\n    \"longitude\": \"25\",\n    \"tags\":[\"grafiti\", \"mur\"],\n    \"user\":\"58b6cb1ce2a1de16edbc5a41\"\n}",        "type": "json"      }    ],    "filename": "routes/issues.js",    "groupTitle": "Issue",    "parameter": {      "fields": {        "Request body": [          {            "group": "Request body",            "type": "String",            "allowedValues": [              "\"new\"",              "\"inProgress\"",              "\"completed\"",              "\"canceled\""            ],            "optional": false,            "field": "status",            "description": "<p>The status of the issue</p>"          },          {            "group": "Request body",            "type": "String",            "size": "2..30",            "optional": false,            "field": "description",            "description": "<p>The description of the issue</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "imageUrl",            "description": "<p>The image's URL of the issue</p>"          },          {            "group": "Request body",            "type": "Number",            "optional": false,            "field": "latitude",            "description": "<p>The latitude of the issue</p>"          },          {            "group": "Request body",            "type": "Number",            "optional": false,            "field": "longitude",            "description": "<p>The longitude of the issue</p>"          },          {            "group": "Request body",            "type": "String[]",            "optional": false,            "field": "tags",            "description": "<p>The tags of the issue</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "user",            "description": "<p>The id of the user who create the issue</p>"          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "422/UnprocessableEntity",            "description": "<p>Some of the issue's properties are invalid</p>"          }        ]      },      "examples": [        {          "title": "422 Unprocessable Entity",          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  \"message\": \"Issue validation failed\",\n  \"errors\": {\n    \"status\": {\n      \"message\": \"Path `status` is required.\",\n      \"name\": \"ValidatorError\",\n      \"properties\": {\n        \"type\": \"required\",\n        \"message\": \"Path `{PATH}` is required.\",\n        \"path\": \"status\"\n      },\n      \"kind\": \"required\",\n      \"path\": \"status\"\n    },\n    \"description\": {\n      \"message\": \"Path `description` is required.\",\n      \"name\": \"ValidatorError\",\n      \"properties\": {\n        \"type\": \"required\",\n        \"message\": \"Path `{PATH}` is required.\",\n        \"path\": \"description\"\n      },\n      \"kind\": \"required\",\n      \"path\": \"description\"\n    },\n    \"imageUrl\": {\n      \"message\": \"Path `imageUrl` must be a String.\",\n      \"name\": \"ValidatorError\",\n      \"properties\": {\n        \"type\": \"String\",\n        \"message\": \"Path `{PATH}` must be a String.\",\n        \"path\": \"imageUrl\"\n      }\n    },\n    \"latitude\": {\n      \"message\": \"Path `latitude` is required.\",\n      \"name\": \"ValidatorError\",\n      \"properties\": {\n        \"type\": \"required\",\n        \"message\": \"Path `{PATH}` is required.\",\n        \"path\": \"latitude\"\n      },\n      \"kind\": \"required\",\n      \"path\": \"latitude\"\n    },\n    \"longitude\": {\n      \"message\": \"Path `longitude` is required.\",\n      \"name\": \"ValidatorError\",\n      \"properties\": {\n        \"type\": \"required\",\n        \"message\": \"Path `{PATH}` is required.\",\n        \"path\": \"longitude\"\n      },\n      \"kind\": \"required\",\n      \"path\": \"longitude\"\n    },\n  }\n}",          "type": "json"        }      ]    }  },  {    "type": "delete",    "url": "/api/issues/:id",    "title": "Delete an issue",    "name": "DeleteIssue",    "group": "Issue",    "version": "1.0.0",    "description": "<p>Permanently deletes an issue.</p>",    "examples": [      {        "title": "Example",        "content": "DELETE /api/issues/58b6d82009bf0f18065d210f HTTP/1.1",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "204 No Content",          "content": "HTTP/1.1 204 No Content",          "type": "json"        }      ]    },    "filename": "routes/issues.js",    "groupTitle": "Issue",    "parameter": {      "fields": {        "URL path parameters": [          {            "group": "URL path parameters",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>The unique identifier of the issue to retrieve</p>"          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "404/NotFound",            "description": "<p>No issue was found corresponding to the ID in the URL path</p>"          }        ]      },      "examples": [        {          "title": "404 Not Found",          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo issue with ID 58b6d82009bf0f18065d210f",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/issue/:id",    "title": "Retrieve an issue",    "name": "RetrieveIssue",    "group": "Issue",    "version": "1.0.0",    "description": "<p>Retrieves one issue.</p>",    "examples": [      {        "title": "Example",        "content": "GET /Issue/58b6d82009bf0f18065d210f HTTP/1.1",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "200 OK",          "content": "   HTTP/1.1 200 OK\n   Content-Type: application/json\n\n{\n  \"_id\": \"58b6d82009bf0f18065d210f\",\n  \"description\": \"cailloux sur la route de la gare\",\n  \"latitude\": 23,\n  \"longitude\": 285,\n  \"__v\": 0,\n  \"createdAt\": \"2017-03-01T14:18:08.096Z\",\n  \"user\": \"58b6cb1ce2a1de16edbc5a41\",\n  \"tags\": [\n    \"cailloux\",\n    \"route\",\n    \"gare\"\n  ],\n  \"status\": \"new\"\n}",          "type": "json"        }      ],      "fields": {        "Response body": [          {            "group": "Response body",            "type": "String",            "allowedValues": [              "\"new\"",              "\"inProgress\"",              "\"completed\"",              "\"canceled\""            ],            "optional": false,            "field": "status",            "description": "<p>The status of the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>The description of the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "imageURL",            "description": "<p>The description of the issue</p>"          },          {            "group": "Response body",            "type": "Number",            "optional": false,            "field": "latitude",            "description": "<p>The latitude of the issue</p>"          },          {            "group": "Response body",            "type": "Number",            "optional": false,            "field": "longitude",            "description": "<p>The longitude of the issue</p>"          },          {            "group": "Response body",            "type": "String[]",            "optional": false,            "field": "tags",            "description": "<p>The tags of the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "user",            "description": "<p>The id of the user who create the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "createdAt",            "description": "<p>The date at which the issue was created</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>The unique identifier of the issue</p>"          }        ]      }    },    "filename": "routes/issues.js",    "groupTitle": "Issue",    "parameter": {      "fields": {        "URL path parameters": [          {            "group": "URL path parameters",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>The unique identifier of the issue to retrieve</p>"          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "404/NotFound",            "description": "<p>No issue was found corresponding to the ID in the URL path</p>"          }        ]      },      "examples": [        {          "title": "404 Not Found",          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo issue with ID 58b6d82009bf0f18065d210f",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/issues",    "title": "List issues",    "name": "RetrieveIssues",    "group": "Issue",    "version": "1.0.0",    "description": "<p>Retrieves a list of issues</p>",    "examples": [      {        "title": "Example",        "content": "GET /issues HTTP/1.1",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "200 OK",          "content": "    HTTP/1.1 200 OK\n    Content-Type: application/json\n\n[\n {\n   \"_id\": \"58b6cd77e2a1de16edbc5a44\",\n   \"description\": \"Graphiti sur le mur de l'église\",\n   \"latitude\": 2,\n   \"longitude\": 42,\n   \"__v\": 0,\n   \"createdAt\": \"2017-03-01T13:32:39.570Z\",\n   \"user\": \"58b6cb11e2a1de16edbc5a41\",\n   \"tags\": [\n     \"église\",\n     \"graphiti\"\n   ],\n   \"status\": \"new\"\n },\n {\n   \"_id\": \"58b6d82009bf0f18065d210f\",\n   \"description\": \"cailloux sur la route de la gare\",\n   \"latitude\": 23,\n   \"longitude\": 285,\n   \"__v\": 0,\n   \"createdAt\": \"2017-03-01T14:18:08.096Z\",\n   \"user\": \"58b6cb1ce2a1de16edbc5a41\",\n   \"tags\": [\n     \"cailloux\",\n     \"route\",\n     \"gare\"\n   ],\n   \"status\": \"new\"\n }\n]",          "type": "json"        }      ],      "fields": {        "Response body": [          {            "group": "Response body",            "type": "String",            "allowedValues": [              "\"new\"",              "\"inProgress\"",              "\"completed\"",              "\"canceled\""            ],            "optional": false,            "field": "status",            "description": "<p>The status of the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>The description of the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "imageURL",            "description": "<p>The description of the issue</p>"          },          {            "group": "Response body",            "type": "Number",            "optional": false,            "field": "latitude",            "description": "<p>The latitude of the issue</p>"          },          {            "group": "Response body",            "type": "Number",            "optional": false,            "field": "longitude",            "description": "<p>The longitude of the issue</p>"          },          {            "group": "Response body",            "type": "String[]",            "optional": false,            "field": "tags",            "description": "<p>The tags of the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "user",            "description": "<p>The id of the user who create the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "createdAt",            "description": "<p>The date at which the issue was created</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>The unique identifier of the issue</p>"          }        ]      }    },    "filename": "routes/issues.js",    "groupTitle": "Issue"  },  {    "type": "get",    "url": "/issues",    "title": "List issues filtered",    "name": "RetrieveIssuesFromSpecificUser",    "group": "Issue",    "version": "1.0.0",    "description": "<p>Retrieves a list of issues from a specific user</p>",    "examples": [      {        "title": "Example",        "content": "GET /issues?user=58b6cb1ce2a1de16edbc5a41 HTTP/1.1",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "200 OK",          "content": "    HTTP/1.1 200 OK\n    Content-Type: application/json\n\n[\n {\n   \"_id\": \"58b6d82009bf0f18065d210f\",\n   \"description\": \"cailloux sur la route de la gare\",\n   \"latitude\": 23,\n   \"longitude\": 285,\n   \"__v\": 0,\n   \"createdAt\": \"2017-03-01T14:18:08.096Z\",\n   \"user\": \"58b6cb1ce2a1de16edbc5a41\",\n   \"tags\": [\n     \"cailloux\",\n     \"route\",\n     \"gare\"\n   ],\n   \"status\": \"new\"\n }\n]",          "type": "json"        }      ],      "fields": {        "Response body": [          {            "group": "Response body",            "type": "String",            "allowedValues": [              "\"new\"",              "\"inProgress\"",              "\"completed\"",              "\"canceled\""            ],            "optional": false,            "field": "status",            "description": "<p>The status of the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "description",            "description": "<p>The description of the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "imageURL",            "description": "<p>The description of the issue</p>"          },          {            "group": "Response body",            "type": "Number",            "optional": false,            "field": "latitude",            "description": "<p>The latitude of the issue</p>"          },          {            "group": "Response body",            "type": "Number",            "optional": false,            "field": "longitude",            "description": "<p>The longitude of the issue</p>"          },          {            "group": "Response body",            "type": "String[]",            "optional": false,            "field": "tags",            "description": "<p>The tags of the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "user",            "description": "<p>The id of the user who create the issue</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "createdAt",            "description": "<p>The date at which the issue was created</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>The unique identifier of the issue</p>"          }        ]      }    },    "filename": "routes/issues.js",    "groupTitle": "Issue",    "parameter": {      "fields": {        "URL path parameters": [          {            "group": "URL path parameters",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>The unique identifier of the user to retrieve</p>"          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "404/NotFound",            "description": "<p>No issue was found corresponding to the ID in the URL path</p>"          }        ]      },      "examples": [        {          "title": "404 Not Found",          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo issue with ID 58b6d82009bf0f18065d210f",          "type": "json"        }      ]    }  },  {    "type": "post",    "url": "/users",    "title": "Create a user",    "name": "CreateUser",    "group": "User",    "version": "1.0.0",    "description": "<p>Registers a new user.</p>",    "success": {      "fields": {        "Response body": [          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>A unique identifier for the user generated by the server</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "firstName",            "description": "<p>The first name of the user</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "lastName",            "description": "<p>The last name of the user</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "role",            "description": "<p>The role of the user</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "createdAt",            "description": "<p>The date at which the user was created</p>"          }        ]      },      "examples": [        {          "title": "201 Created",          "content": "HTTP/1.1 201 Created\nContent-Type: application/json\nLocation: https://heigvd-webserv-2017-team-7.herokuapp.com/users/58b588145f392e0d34e16b44\n\n{\n   \"firstName\": \"Adrien\",\n   \"lastName\": \"Savoretti\",\n   \"role\": \"manager\",\n   \"createdAt\": \"2017-02-28T14:24:20.482Z\",\n   \"id\": \"58b588145f392e0d34e16b44\"\n }",          "type": "json"        }      ]    },    "examples": [      {        "title": "Example",        "content": "POST /users HTTP/1.1\nContent-Type: application/json\n\n{\n  \"firstName\": \"Adrien\",\n  \"lastName\": \"Savoretti\",\n  \"role\": \"manager\"\n}",        "type": "json"      }    ],    "filename": "routes/users.js",    "groupTitle": "User",    "parameter": {      "fields": {        "Request body": [          {            "group": "Request body",            "type": "String",            "size": "2..20",            "optional": false,            "field": "firstName",            "description": "<p>The first name of the user</p>"          },          {            "group": "Request body",            "type": "String",            "size": "2..20",            "optional": false,            "field": "lastName",            "description": "<p>The last name of the user</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "role",            "description": "<p>The role of the user</p>"          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "422/UnprocessableEntity",            "description": "<p>Some of the user's properties are invalid</p>"          }        ]      },      "examples": [        {          "title": "422 Unprocessable Entity",          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  \"message\": \"User validation failed\",\n  \"errors\": {\n    \"role\": {\n      \"message\": \"Path `role` is required.\",\n      \"name\": \"ValidatorError\",\n      \"properties\": {\n        \"type\": \"required\",\n        \"message\": \"Path `{PATH}` is required.\",\n        \"path\": \"role\"\n      },\n      \"kind\": \"required\",\n      \"path\": \"role\"\n    },\n    \"lastName\": {\n      \"message\": \"Path `lastName` is required.\",\n      \"name\": \"ValidatorError\",\n      \"properties\": {\n        \"type\": \"required\",\n        \"message\": \"Path `{PATH}` is required.\",\n        \"path\": \"lastName\"\n      },\n      \"kind\": \"required\",\n      \"path\": \"lastName\"\n    },\n    \"firstName\": {\n      \"message\": \"Path `firstName` (`J`) is shorter than the minimum allowed length (2).\",\n      \"name\": \"ValidatorError\",\n      \"properties\": {\n        \"minlength\": 2,\n        \"type\": \"minlength\",\n        \"message\": \"Path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length (2).\",\n        \"path\": \"firstName\",\n        \"value\": \"J\"\n      },\n      \"kind\": \"minlength\",\n      \"path\": \"firstName\",\n      \"value\": \"J\"\n    }\n  }\n}",          "type": "json"        }      ]    }  },  {    "type": "patch",    "url": "/users/:id",    "title": "Partially update a user",    "name": "PartiallyUpdateUser",    "group": "User",    "version": "1.0.0",    "description": "<p>Partially updates a user's data (only the properties found in the request body will be updated). All properties are optional.</p>",    "examples": [      {        "title": "Example",        "content": "PATCH /users/58b588145f392e0d34e16b44 HTTP/1.1\nContent-Type: application/json\n\n{\n  \"role\": \"citizen\"\n}",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "200 OK",          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n   \"firstName\": \"Adrien\",\n   \"lastName\": \"Savoretti\",\n   \"role\": \"citizen\",\n   \"createdAt\": \"2017-02-28T14:24:20.482Z\",\n   \"id\": \"58b588145f392e0d34e16b44\"\n }",          "type": "json"        }      ],      "fields": {        "Response body": [          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "firstName",            "description": "<p>The first name of the user</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "lastName",            "description": "<p>The last name of the user</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "role",            "description": "<p>The role of the user</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "createdAt",            "description": "<p>The date at which the user was created</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>The unique identifier of the user</p>"          }        ]      }    },    "filename": "routes/users.js",    "groupTitle": "User",    "parameter": {      "fields": {        "URL path parameters": [          {            "group": "URL path parameters",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>The unique identifier of the user to retrieve</p>"          }        ],        "Request body": [          {            "group": "Request body",            "type": "String",            "size": "2..20",            "optional": false,            "field": "firstName",            "description": "<p>The first name of the user</p>"          },          {            "group": "Request body",            "type": "String",            "size": "2..20",            "optional": false,            "field": "lastName",            "description": "<p>The last name of the user</p>"          },          {            "group": "Request body",            "type": "String",            "optional": false,            "field": "role",            "description": "<p>The role of the user</p>"          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "404/NotFound",            "description": "<p>No user was found corresponding to the ID in the URL path</p>"          },          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "422/UnprocessableEntity",            "description": "<p>Some of the user's properties are invalid</p>"          }        ]      },      "examples": [        {          "title": "404 Not Found",          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo movie user with ID 58b588144f392e0d34e16b44",          "type": "json"        },        {          "title": "422 Unprocessable Entity",          "content": "HTTP/1.1 422 Unprocessable Entity\nContent-Type: application/json\n\n{\n  \"message\": \"User validation failed\",\n  \"errors\": {\n    \"role\": {\n      \"message\": \"Path `role` is required.\",\n      \"name\": \"ValidatorError\",\n      \"properties\": {\n        \"type\": \"required\",\n        \"message\": \"Path `{PATH}` is required.\",\n        \"path\": \"role\"\n      },\n      \"kind\": \"required\",\n      \"path\": \"role\"\n    },\n    \"lastName\": {\n      \"message\": \"Path `lastName` is required.\",\n      \"name\": \"ValidatorError\",\n      \"properties\": {\n        \"type\": \"required\",\n        \"message\": \"Path `{PATH}` is required.\",\n        \"path\": \"lastName\"\n      },\n      \"kind\": \"required\",\n      \"path\": \"lastName\"\n    },\n    \"firstName\": {\n      \"message\": \"Path `firstName` (`J`) is shorter than the minimum allowed length (2).\",\n      \"name\": \"ValidatorError\",\n      \"properties\": {\n        \"minlength\": 2,\n        \"type\": \"minlength\",\n        \"message\": \"Path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length (2).\",\n        \"path\": \"firstName\",\n        \"value\": \"J\"\n      },\n      \"kind\": \"minlength\",\n      \"path\": \"firstName\",\n      \"value\": \"J\"\n    }\n  }\n}",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/users/:id",    "title": "Retrieve a user",    "name": "RetrieveUser",    "group": "User",    "version": "1.0.0",    "description": "<p>Retrieves one user.</p>",    "examples": [      {        "title": "Example",        "content": "GET /users/58b588145f392e0d34e16b44 HTTP/1.1",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "200 OK",          "content": "HTTP/1.1 200 OK\nContent-Type: application/json\n\n{\n   \"firstName\": \"Adrien\",\n   \"lastName\": \"Savoretti\",\n   \"role\": \"manager\",\n   \"createdAt\": \"2017-02-28T14:24:20.482Z\",\n   \"id\": \"58b588145f392e0d34e16b44\"\n }",          "type": "json"        }      ],      "fields": {        "Response body": [          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "firstName",            "description": "<p>The first name of the user</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "lastName",            "description": "<p>The last name of the user</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "role",            "description": "<p>The role of the user</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "createdAt",            "description": "<p>The date at which the user was created</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>The unique identifier of the user</p>"          }        ]      }    },    "filename": "routes/users.js",    "groupTitle": "User",    "parameter": {      "fields": {        "URL path parameters": [          {            "group": "URL path parameters",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>The unique identifier of the user to retrieve</p>"          }        ]      }    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "type": "Object",            "optional": false,            "field": "404/NotFound",            "description": "<p>No user was found corresponding to the ID in the URL path</p>"          }        ]      },      "examples": [        {          "title": "404 Not Found",          "content": "HTTP/1.1 404 Not Found\nContent-Type: text/plain\n\nNo movie user with ID 58b588144f392e0d34e16b44",          "type": "json"        }      ]    }  },  {    "type": "get",    "url": "/users",    "title": "List users",    "name": "RetrieveUsers",    "group": "User",    "version": "1.0.0",    "description": "<p>Retrieves a list of users</p>",    "examples": [      {        "title": "Example",        "content": "GET /users HTTP/1.1",        "type": "json"      }    ],    "success": {      "examples": [        {          "title": "200 OK",          "content": "    HTTP/1.1 200 OK\n    Content-Type: application/json\n\n[\n  {\n    \"firstName\": \"Adrien\",\n    \"lastName\": \"Savoretti\",\n    \"role\": \"manager\",\n    \"createdAt\": \"2017-02-28T14:24:20.482Z\",\n    \"id\": \"58b588145f392e0d34e16b44\"\n  },\n  {\n    \"firstName\": \"Cristian\",\n    \"lastName\": \"Esparis\",\n    \"role\": \"manager\",\n    \"createdAt\": \"2017-02-28T14:27:48.875Z\",\n    \"id\": \"58b588e481182b3110082ccc\"\n  }\n]",          "type": "json"        }      ],      "fields": {        "Response body": [          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "firstName",            "description": "<p>The first name of the user</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "lastName",            "description": "<p>The last name of the user</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "role",            "description": "<p>The role of the user</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "createdAt",            "description": "<p>The date at which the user was created</p>"          },          {            "group": "Response body",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>The unique identifier of the user</p>"          }        ]      }    },    "filename": "routes/users.js",    "groupTitle": "User"  }] });
