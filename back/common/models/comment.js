'use strict';

module.exports = function(Comment) {
  Comment.beforeRemote('create', function(context, user, next){
    context.args.data.creatorID = context.req.accessToken.userId;
    next();
  });

};
