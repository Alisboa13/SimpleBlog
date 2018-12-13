'use strict';

module.exports = function(Blog) {
  // Validations
  Blog.validatesPresenceOf('title', 'content', 'creatorID');
  Blog.validatesLengthOf('title', {min: 3, max: 255, message: {min: "Title too short", max: "Title too long"}});
  Blog.validatesLengthOf('content', {min: 3, message: {min: "content too short"}});

  Blog.beforeRemote('create', function(context, user, next){
    context.args.data.creatorID = context.req.accessToken.userId;
    next();
  });

  Blog.beforeRemote("prototype_create_comments", function(context, user, next){
    context.args.data.creatorID = context.req.accessToken.userId;
    next();
  });
};
