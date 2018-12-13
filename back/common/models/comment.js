'use strict';

module.exports = function(Comment) {
  Comment.validatesPresenceOf('blogId', 'content');
  Comment.validatesLengthOf('content', {min:1, max:256, message: {min: 'Comment too Short', max: 'Comment too long'}});
  Comment.beforeRemote('create', function(context, user, next){
    context.args.data.creatorID = context.req.accessToken.userId;
    next();
  });

};
