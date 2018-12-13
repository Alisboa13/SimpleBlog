'use strict';

module.exports = function(Blog) {
  Blog.beforeRemote('create', function(context, user, next){
    context.args.data.creatorID = context.req.accessToken.userId;
    next();
  });
  Blog.beforeRemote("prototype_create_comments", function(context, user, next){
    context.args.data.creatorID = context.req.accessToken.userId;
    next();
  });
};
